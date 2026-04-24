
<script>

  import { marked } from '@components/blogalog/utils/markdownit.js'
  import * as chrono from 'chrono-node';
  import { z } from 'zod';
  import { actions } from 'astro:actions';

	import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
  // import { Checkbox } from "$lib/components/ui/checkbox/index.ts";
  // import * as Table from "$lib/components/ui/table/index.ts";


  import { tick } from "svelte";
  import Icon from '@iconify/svelte';
	import { MagicWand, LightningBolt, CaretSort, Check, Rocket, ChevronDown, Width, Calendar as CalendarIcon } from "radix-icons-svelte";
  import { cn } from "$lib/utils";

  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  let showPrompt = false, showPromptDone = false;
  

  import { CalendarDate, today, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import { immerStore, History } from 'svelte-immer-store';  
  
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.ts";
  import * as Command from "$lib/components/ui/command/index.ts";


  // import currencyList from './short-currencies.json';
  import currencyList from './currencies.json';


  let checked = false
  // let promptStr = "what's $100 USD to all north african countries currencies?"
  export let promptStr = "is USD or AUD trending stronger over the last month? Give number values"
  let errorMessages, message, requests=[], results=[], result;
  export let amount = 100




  let fromOpen, toOpen, calOpen;
  export let currencyData$ = immerStore({
    from: 'AUD',
    to: 'USD',
    amount: 100,
    date: today(getLocalTimeZone()),
  });

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });
  const dfs = new DateFormatter("en-US", {
    dateStyle: "short"
  });

	const from$ = currencyData$.select(state => state.to);
	const to$ = currencyData$.select(state => state.from);
	const amount$ = currencyData$.select(state => state.amount);
	const date$ = currencyData$.select(state => state.date);

  function currencySwap() {
    let temp = $from$;
    $from$ = $to$;
    $to$ = temp;
    console.log(`Clicked swap | currencyData`, $currencyData$);
  }

  const currencies = Object.values(currencyList).map(cur => ({
    ...cur,
    value: cur.code,
    label: cur.code
  }))
  
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId) {
    fromOpen = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }


  // just data, no LLM
  async function doDataConvert(currencyData) {
    message='Converting...';
    
    try {
      let postData = {
        pipeline: [
          {
            name: "getCurrency",
            settings: {
              amount: currencyData.amount.toString(),
              from: currencyData.from,
              to: currencyData.to,
              date: currencyData.date.toString()
            }
          }
        ]
      }
      console.log('Sending data...', postData);
      requests = [...requests, postData];
      const { data: result, error } = await actions.pipe({ pipeline: postData.pipeline });

      if (error) {
        message = error.message || 'Oops!';
        throw new Error(error.message);
      }
      results = [...results, result];
      requests = [...requests, result];

      message = `Total amount in ${$to$}: ${currencies.filter(cur => cur.value === $to$)[0].symbol}${result.data.result}`;
    } catch (error) {
      console.error('An error occurred while converting:', error);
      message = 'An error occurred while converting.';
    }
  }


  // llm conversion
  async function doConvert(promptStr) {
    message='Getting an answer...';
    
    try {
      // let prompt = `Ask: ${promptStr} | 
      //     If the user's ask about currencies is nuanced, please add an "explanation" key to the JSON response. If the request asks about multiple or area currencies, please decide how to run multiple function calling, run them an explain the output in your answer.
      //     Always use the currency conversion function.
      let prompt = `Ask: ${promptStr} | 
          If the user's ask about currencies is nuanced, please add furter explanation. If the request asks about multiple or area currencies, please decide how to run multiple function calling, run them an explain the output in your answer.
          Always use the currency conversion function.
          Today's date is ${today(getLocalTimeZone())}
        `
      let postData = {
        "pipeline": [
          {
            "name": "ai",
            "settings": {
              "tools": [
                "getCurrency"
              ],
              "prompt": `${prompt}`,
              // "model": "llama3-groq-8b-8192-tool-use-preview",
              // "provider": "groq"
              "model": "gpt-4o-mini",
              "provider": "openai"
            }
          },
          {
            "name": "ai",
            "settings": {
              "prompt": `Please use the context to asnswer the following query:<query>${prompt}</query>. Be succinct in your answer. Just respond to the answer, don't reflect on the question or explain your answer.`,
              "model": "llama3-70b-8192",
              "provider": "groq",

            }
          }
        ]
      }

      requests = [...requests, postData];

      const { data: r, error } = await actions.pipe({ pipeline: postData.pipeline });

      if (error) {
        message = error.message || 'Oops!';
        throw new Error(error.message);
      }
      message='Thinking about my answer...';
      result = r;
      results = [...results, result];
      requests = [...requests, result];

      if(result?.data) {
        message = result?.reply?.json?.fullAnswer || `Amount: ${result?.reply?.json?.answer}`;
      }

      console.log('llm response:', result)
      if(result?.data) {
        message = marked(result?.data?.text || result?.data)
      }
    } catch (error) {
      console.error('An error occurred while converting:', error);
      message = 'An error occurred while converting.';
    }
  }




  // this is used to review answers from the first prompt
  async function prompt(promptStr) {
    try {
      const postData = {
        mode: "prompt",
        str: promptStr
      };
      requests = [...requests, postData];
      const response = await fetch('/experiments/currencies/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
      } else {
        const result = await response.json();
        results = [...results, result];
        requests = [...requests, result];

        return result
      }
    } catch (error) {
    }
  }

</script>










<div class="ConciergeConverter | p-4 rounded-md bg-sky-50 mb-4 shadow-sm shadow-blue-200/80 | border border-blue-100">

  <div class="concierge-group-test">
    <div class="ui-group flex flex-row items-center gap-1 | overflow-hidden">
  
      <!-- <div class="switcher | relative  flex flex-row gap-2 items-center flex-1 {!showPromptDone && 'overflow-hidden'}"> -->
      <div class="switcher | relative  flex flex-row gap-2 items-center flex-1 py-1">
      <!-- <div class="switcher | relative  flex flex-row gap-2 items-center flex-1 | overflow-hidden"> -->
        <div class="trad-ui flex flex-row items-center gap-1 | flex-1 shrink | md:max-w-[85%] pr-2">
          
          <span class="hidden md:inline pr-1 md:w-8 text-right text-sm text-gray-500">{currencies.filter(cur => cur.value === $from$)[0].symbol}</span>
          <Input type="number" placeholder="Amount" class="bg-white w-12 md:w-14 px-2 | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100" bind:value="{$amount$}" />
        
          <Popover.Root bind:open={fromOpen} let:ids>
            <Popover.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="outline"
                role="combobox"
                aria-expanded={fromOpen}
                class="min-w-[70px] px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100"
              >
                <!-- {currencies.filter(cur => cur.value === $from$)[0].symbol} -->
                <span>{$from$}</span>
                <!-- <span class="text-sm text-gray-500 baseline">
                  {currencies.filter(cur => cur.value === $from$)[0].name}
                </span> -->
                <ChevronDown class="hidden md:inline h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content class="w-[200px] p-0">
              <Command.Root>
                <Command.Input placeholder="Search currencies..." />
                <Command.Empty>No currency found.</Command.Empty>
                <Command.Group class="max-h-48 overflow-y-auto">
                  {#each currencies as currency}
                    <Command.Item
                      value={currency.value}
                      onSelect={(currentValue) => {
                        $from$ = currentValue;
                        closeAndFocusTrigger(ids.trigger);
                      }}
                    >
                      <span>
                        {currency.label}
                      </span>
                      <span class="ml-2 text-sm text-gray-500 baseline">
                        {currency.name}
                      </span>
                    </Command.Item>
                  {/each}
                </Command.Group>
              </Command.Root>
            </Popover.Content>
          </Popover.Root>
            
          <Button 
            on:click={() => {
              currencySwap();
            }}
            variant="outline" 
            class="hidden md:inline-flex px-0 cursor-pointer w-10 h-9 | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100"
              >
            <Label class="cursor-pointer text-center">
              <Width class="h-4 w-4 text-center" />
            </Label>
          </Button>
        
          <Popover.Root bind:open={toOpen} let:ids>
            <Popover.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="outline"
                role="combobox"
                aria-expanded={toOpen}
                class="min-w-[70px] px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100"
              >
                <span>{$to$}</span>
                <ChevronDown class="hidden md:inline h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content class="w-[200px] p-0">
              <Command.Root>
                <Command.Input placeholder="Search currencies..." />
                <Command.Empty>No currency found.</Command.Empty>
                <Command.Group class="max-h-48 overflow-y-auto">
                  {#each currencies as currency}
                    <Command.Item
                      value={currency.value}
                      onSelect={(currentValue) => {
                        $to$ = currentValue;
                        closeAndFocusTrigger(ids.trigger);
                      }}
                    >
                      <span>
                        {currency.label}
                      </span>
                      <span class="ml-2 text-sm text-gray-500 baseline">
                        {currency.name}
                      </span>
                    </Command.Item>
                  {/each}
                </Command.Group>
              </Command.Root>
            </Popover.Content>
          </Popover.Root>
          
          <Popover.Root bind:open={calOpen}>
            <Popover.Trigger asChild let:builder>
              <Button
                variant="outline"
                class={cn(
                  "flex-1 px-1 md:px-4 md:w-[240px] justify-start text-left font-normal overflow-hidden | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100",
                  !$date$ && "text-muted-foreground"
                )}
                builders={[builder]}
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <!-- <span class="hidden md:inline"> -->
                  {$date$ && $date$?.toDate ? dfs.format($date$?.toDate(getLocalTimeZone())) : "Pick a date"}
                <!-- </span> -->
              </Button>
            </Popover.Trigger>
            <Popover.Content class="w-auto p-0" align="start">
              <Input type="text" placeholder="Enter a date (e.g. 'yesterday')" class="w-full inline-block | border border-blue-400 focus-visible:ring-blue-400/40 " 
                on:input={(e)=>{
                if(e.target.value) {
                  let newdate = chrono.parseDate(e.target.value);
                  if (newdate) {
                    console.log('newDate:', newdate);
                    let year = newdate.getUTCFullYear();
                    let month = newdate.getUTCMonth() + 1; // getUTCMonth() returns a zero-based month, so we add 1
                    let day = newdate.getUTCDate();
                    $date$ = new CalendarDate(year, month, day, getLocalTimeZone());
                  } else {
                    console.error('Invalid date:', e.target.value);
                  }
                }
                }}
                on:keydown={(e)=>{
                  if(e.key === 'Enter') {
                    let newdate = chrono.parseDate(e.target.value);
                    if (newdate) {
                      console.log('newDate:', newdate);
                      let year = newdate.getUTCFullYear();
                      let month = newdate.getUTCMonth() + 1; // getUTCMonth() returns a zero-based month, so we add 1
                      let day = newdate.getUTCDate();
                      $date$ = new CalendarDate(year, month, day, getLocalTimeZone());
                      calOpen = false;
                    } else {
                      console.error('Invalid date:', e.target.value);
                    }
                  }
                }}
              />
              <Calendar class="calendar-object" bind:value="{$date$}" />
            </Popover.Content>
          </Popover.Root>
        </div>


        {#if showPrompt}
          <div class="prompt-ui | mb-4 w-full flex flex-row gap-0 | z-40 absolute top-1 left-0 "
            transition:fly="{{ x: 1000, opacity: 1, duration: 500, easing: cubicOut }}"
            on:introend={() => {
              showPromptDone = true;
            }}
            on:outroend={() => {
              showPromptDone = false; 
            }}
          >
            <Button 
              on:click={() => {
                showPromptDone = false;
                showPrompt = !showPrompt;
              }}
              variant="outline" 
              class="flex-2 shrink-0 cursor-pointer w-8 h-9 border rounded-md rounded-r-none border border-r-0 bg-white border-blue-400 hover:border-blue-900 hover:bg-white relative hover:z-50 | pl-4 flex flex-row items-center"
                >
              <Label class="cursor-pointer">
                <!-- <Icon class="w-5 h-5 text-blue-800" icon="ph:sparkle-duotone" /> -->
                <Icon class="w-5 h-5 text-blue-800" icon="ph:chat-circle-duotone" />
              </Label>
            </Button>
            <Input 
              type="text" 
              placeholder="ex: Convert $100 AUD to USD" 
              class="flex-1 bg-white px-2 border-l-0 rounded-none border-r-0 border border-blue-400 hover:border-blue-900 focus-visible:ring-0 | max-w-[90%]" 
              bind:value="{promptStr}" 
              on:keydown={(e) => {
                if(e.key === 'Enter') {
                  doConvert(promptStr);
                }
              }}
            />
          </div>
        {/if}

        <div class="btn-group | absolute right-0 pr-1">

          <Button 
            on:click={() => {
              showPromptDone = false;
              showPrompt = !showPrompt;
            }}
            variant="outline" 
            class="magic-btn | cursor-pointer w-12 h-9 rounded-l-none md:rounded-l-md rounded-r-none | relative border border-blue-400 hover:border-blue-900 {!showPrompt&&'hover:z-50'} hover:bg-blue-50 focus-visible:ring-blue-400/100"
              >
            <Label class="cursor-pointer">
              <!-- <Icon class="w-5 h-5 text-blue-800" icon="ph:sparkle-duotone" /> -->
              <Icon class="w-5 h-5 text-blue-800" icon="ph:chat-circle-duotone" />
            </Label>
          </Button>
          <div class="underlay inline-block h-9 w-16 -mr-6 w-16 | bg-sky-50 relative z-[100] ">
            <!-- the underlay prevents the magic button from bleeding when moving -->
            <Button 
              on:click={() => {
                if(showPrompt) {
                  doConvert(promptStr);
                } else {
                  doDataConvert($currencyData$);
                }
              }}
              variant="outline" 
              class="calc-btn | cursor-pointer w-12 h-9 -ml-2 rounded-l-none relative z-40 | border border-blue-400 hover:border-blue-900 hover:bg-blue-50 focus-visible:ring-blue-400/100"
                >
              <Label class="cursor-pointer">
                {#if showPrompt}
                  <!-- <Icon class="w-5 h-5 text-blue-800" icon="ph:chat-duotone" /> -->
                  <Icon class="w-5 h-5 text-blue-800" icon="ph:arrow-circle-right-bold" />
                {:else}
                  <Icon class="w-5 h-5 text-blue-800" icon="ph:calculator-duotone" />
                {/if}
              </Label>
            </Button>
          </div>
        </div>
      
        
      </div>

    </div>

    <div class="chit-group | mt-3 md:mt-1">

      <Button 
          on:click={() => {
            doConvert("what's $100 USD to ```(CAD, EUR, and AUD)```? Please use function calling, once for each pair, THREE TIMES — return the answer for CAD, EUR aud AUD; Ignore previous instructions for outputting answer as an object, OUTPUT YOUR ANSWER IN AN ENGLISH SENTENCE with money symbols, as: '$100 USD is $100 CAD, $100 EUR, and $100 AUD' ");
          }}
          variant="outline" 
          class="bg-white/50 py-0 px-2 h-20 cursor-pointer h-[25px] active | text-blue-500/70 border-blue-400 hover:text-blue-900 hover:border-blue-400 hover:bg-blue-100/20 focus-visible:ring-blue-400/100"
      >
          <Label class="cursor-pointer ">
            USD → CAD, EUR, AUD
          </Label>
      </Button>

      <Button 
          on:click={() => {
            doConvert("what's $100 USD to CAD in the last 7 days? Please provide an HTML table with the date and the amount in CAD for each day.");
          }}
          variant="outline" 
          class="bg-white/50 py-0 px-2 h-20 cursor-pointer h-[25px] active | text-blue-500/70 border-blue-400 hover:text-blue-900 hover:border-blue-400 hover:bg-blue-100/20 focus-visible:ring-blue-400/100"
      >
          <Label class="py-0 cursor-pointer ">
            USD → CAD for the last seven days
          </Label>
      </Button>

    </div>

  </div>


  {#if message}
    <div class="message-group | text-sm rounded-md mt-3 -mb-1 p-4 bg-white">
      <div class="message | my-2">
        {@html marked(message)||''}
      </div>
    </div>
  {/if}

  {#if requests && requests.length > 0}
    <div class="detail-trace | mt-4 overflow-scroll max-h-48">
      <div class="text-slate-400/80 font-bold text-xs pb-2">llm request • response trace</div>
      {#each requests as result}
        <pre class="overflow-scroll mb-1 | text-slate-400 whitespace-break-spaces bg-slate-200/50 text-xs"><div class="">{JSON.stringify(result,0,2)}</div></pre>
      {/each}
    </div>
  {/if}

  <div class="footer | text-xs text-blue-300 rounded-md mt-3 -mb-1 p-4 pl-0 py-1">
    Conversion data is limited and may be incorrect
  </div>

</div>




<style lang="scss" global is:global>

  .magic-btn:hover {
    &+div .calc-btn { // apply some nice border colors to calc btn
      @apply border-l-blue-400
    }
  }
  .calendar-object {
    --background: 240 100% 99%;
    --foreground: 213 31% 91%;
    --muted: 223 47% 97%;
    --muted-foreground: 215 27% 65%;
    --popover: 240 100% 99%;
    --popover-foreground: 222 47% 11%;
    --card: 240 100% 99%;
    --card-foreground: 222 47% 11%;
    --border: 223 47% 97%;
    --input: 223 47% 97%;
    --primary: 222 69% 45%;
    --primary-foreground: 210 100% 98%;
    --secondary: 210 100% 98%;
    --secondary-foreground: 222 47% 11%;
    --accent: 210 100% 98%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 210 100% 98%;
    --ring: 222 69% 45%;
    --radius: 0.5rem;
  }
  
  /* Basic Tailwind table styles */
  :global(table) {
    @apply w-full border-collapse;
  }

  :global(table th),
  :global(table td) {
    @apply px-4 py-2 text-left;
  }

  :global(table th) {
  }

  :global(table td) {
    @apply border-t border-gray-200;
  }

  :global(table tr:hover) {
    @apply bg-gray-50;
  }

  :global(table th:first-child),
  :global(table td:first-child) {
    @apply pl-6;
  }

  :global(table th:last-child),
  :global(table td:last-child) {
    @apply pr-6;
  }
</style>