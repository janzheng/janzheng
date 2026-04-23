
<!-- 

  a rube goldberg version of chat converter
  - fancy UI that just creates a chat prompt

 -->


<script>

	import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
  import { Checkbox } from "$lib/components/ui/checkbox/index.ts";
  import * as Table from "$lib/components/ui/table/index.ts";
  import Icon from '@iconify/svelte';
	import { MagicWand, CaretSort, Check, Rocket, ChevronDown, Width, Calendar as CalendarIcon } from "radix-icons-svelte";
  import { cn } from "$lib/utils";
  import { tick } from "svelte";

  import * as Popover from "$lib/components/ui/popover/index.ts";
  import * as Command from "$lib/components/ui/command/index.ts";

  // import currencyList from './short-currencies.json';
  import { CalendarDate, today, DateFormatter, getLocalTimeZone } from "@internationalized/date";
  import currencyList from './currencies.json';
	import { immerStore, History } from 'svelte-immer-store';  
  import { writable } from 'svelte/store'

  let fromOpen, toOpen, calOpen;


  let checked = false

  let fromList = writable({
    EUR: true,
    USD: true
  })
  let toList = writable({
    AUD: true,
    CAD: true,
  })

  const currencies = Object.values(currencyList).map(cur => ({
    ...cur,
    value: cur.code,
    label: cur.code
  }))
  
  
  let resultsList = [
    {
        "from": "USD",
        "to": "CAD",
        "amount": 116.92
    },
    {
        "from": "EUR",
        "to": "AUD",
        "amount": 161.28
    },
    {
        "from": "AUD",
        "to": "USD",
        "amount": 65.35
    },
    {
        "from": "CAD",
        "to": "EUD",
        "amount": 73.22
    }
  ]; // conversion results
  resultsList = [] // reset the examples



  let errorMessages, message=false, requests=[], results=[], result;
  export let amount = 100

  export let currencyData$ = immerStore({
    from: 'AUD',
    to: 'USD',
    amount: 100,
    date: today(getLocalTimeZone()),
  });


	// const from$ = currencyData$.select(state => state.to);
	const to$ = currencyData$.select(state => state.from);
	// const amount$ = currencyData$.select(state => state.amount);
	// const date$ = currencyData$.select(state => state.date);



  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId) {
    fromOpen = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  async function doConvert() {
    
    try {
      resultsList = []
      let prompt = `Please convert the amount ${amount} for all possible combinations of the following currencies:
        From currencies: ${Object.entries($fromList).filter(([key, value]) => value).map(([key]) => key).join(', ')}
        To currencies: ${Object.entries($toList).filter(([key, value]) => value).map(([key]) => key).join(', ')}

        Instructions:
        1. Create a conversion for each possible pair of FROM currency to TO currency.
        2. Use one function call for each currency pair, as it only handles ONE CURRENCY PAIR at a time.
        3. Output your answers in an array of JSON objects, with each object structured as follows:
        {
          from: "USD",
          to: "EUR",
          amount: 100,
          result: 116.92
        }

        4. Ensure you make ${Object.entries($fromList).filter(([key, value]) => value).length * Object.entries($toList).filter(([key, value]) => value).length} conversions in total.
        5. If a conversion is not possible or the function call fails, provide your best estimate and add "(guess)" to the 'to' field, e.g., "EUR (guess)".
        6. Review your answers after all function calls to ensure completeness and accuracy.
        7. Return the final result as a JSON array of objects.`

      console.log('prompt', prompt)
      let postData = {
        "pipeline": [
          {
            "name": "ai",
            "settings": {
              "tools": [
                "getCurrency"
              ],
              "prompt": `${prompt} | Today's date is ${today(getLocalTimeZone())}`,
              "model": "llama3-groq-8b-8192-tool-use-preview",
              "provider": "groq"
            }
          }
        ]
      }
      requests = [...requests, postData];

      message=`Calculating conversions...`;

      const response = await fetch('https://coverflow.labspace.ai/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });


      if (!response.ok) {
        message = "Oops!"
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        // message = ''
        result = await response.json()
        results = [...results, result];
        console.log('result', result)
        if(result.data?.steps[0]) {
          const toolResults = result.data.steps[0].toolResults;
          const fromCurrencies = Object.entries($fromList).filter(([key, value]) => value).map(([key]) => key);
          const toCurrencies = Object.entries($toList).filter(([key, value]) => value).map(([key]) => key);
          
          resultsList = toolResults.filter(result => 
            fromCurrencies.includes(result.args.from.toUpperCase()) && 
            toCurrencies.includes(result.args.to.toUpperCase())
          ).map(result => ({
            from: result.result.from.toUpperCase(),
            to: result.result.to.toUpperCase(),
            amount: result.result.amount,
            result: parseFloat(result.result.result)
          }));

          message = `Conversion complete for ${amount} ${fromCurrencies.join(', ')} to ${toCurrencies.join(', ')}`;
        }

        console.log('resultsList', resultsList)
      }
    } catch (error) {
      console.error('An error occurred while converting:', error);
      message = 'An error occurred while converting.';
    }
  }


</script>





<div class="RubeConverter | p-4 rounded-md bg-sky-50 mb-4 shadow-sm shadow-blue-200/80 | border border-blue-100">

  <div class="ui-group justify-center items-center ">

    <div class="flex gap-2 | flex-col justify-center | md:gap-2 md:flex-row md:items-center md:justify-normal | " >
      <Label for="amount" class="">Convert</Label>
      <Input 
        id="amount"
        type="number" 
        placeholder="100" 
        class="bg-white w-16 px-2 | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100" 
        bind:value="{amount}" 
        on:keydown={(e) => {
          if(e.key === 'Enter') {
            doConvert();
          }
        }}
      />
      <Label for="from" class="">from</Label>

      <Popover.Root bind:open={fromOpen} let:ids>
        <Popover.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={fromOpen}
            class="min-w-[70px] px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100 overflow-hidden flex-1"
          >
            <span class="pr-3">
              {#if Object.entries($fromList).length === 0}
                <span>Select</span>
              {:else}
                {Object.entries($fromList).filter(([key, value]) => value).map(([key]) => key).reverse().join(', ')}
              {/if}
            </span>
            <ChevronDown class=" h-4 w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-[200px] p-0">
          <Command.Root>
            <Command.Input placeholder="Search currencies..." />
            <Command.Empty>No currency found.</Command.Empty>
            <Command.Group class="max-h-48 overflow-y-auto">
              {#each currencies as currency}
                <Command.Item
                >
                  <div class="flex items-center space-x-2">
                    <Checkbox id={`from-${currency.code}`} bind:checked={$fromList[currency.code]} />
                    <Label
                      for={`from-${currency.code}`}
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {currency.label}
                      <span class="ml-2 text-sm text-gray-500">
                        {currency.name}
                      </span>
                    </Label>
                  </div>
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      <Label for="to" class="">to</Label>
      <Popover.Root bind:open={toOpen} let:ids>
        <Popover.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={toOpen}
            class="min-w-[70px] px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100 overflow-hidden flex-1"
          >
            <span class="pr-3">
              {#if Object.entries($fromList).length === 0}
                <span>Select</span>
              {:else}
                {Object.entries($toList).filter(([key, value]) => value).map(([key]) => key).reverse().join(', ')}
              {/if}
            </span>
            <ChevronDown class=" h-4 w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-[200px] p-0">
          <Command.Root>
            <Command.Input placeholder="Search currencies..." />
            <Command.Empty>No currency found.</Command.Empty>
            <Command.Group class="max-h-48 overflow-y-auto">
              {#each currencies as currency}
                <Command.Item
                >
                  <div class="flex items-center space-x-2">
                    <Checkbox id={`from-${currency.code}`} bind:checked={$toList[currency.code]} />
                    <Label
                      for={`from-${currency.code}`}
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {currency.label}
                      <span class="ml-2 text-sm text-gray-500">
                        {currency.name}
                      </span>
                    </Label>
                  </div>
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
      
      <Button 
        on:click={() => {
          doConvert(amount);
        }}
        variant="outline" 
        class="cursor-pointer w-24 h-9 | border border-blue-400 hover:border-blue-900 hover:bg-blue-50 focus-visible:ring-blue-400/100"
          >
        <Label class="cursor-pointer">
          <!-- <Icon class="w-6 h-6 text-blue-800" icon="ph:calculator-duotone" /> -->
          <Icon class="w-6 h-6 text-blue-800" icon="ph:sparkle-duotone" />
          <!-- <Rocket class="h-5 w-5 text-blue-800 " /> -->
        </Label>
      </Button>
        
    </div>

  </div>

  {#if message || resultsList.length > 0}
    <div class="message-group | text-sm rounded-md mt-3 -mb-1 p-4 bg-white">

      {#if resultsList && resultsList.length > 0}
        <div class="results-group | bg-white">
          <Table.Root>
            <!-- <Table.Caption>Currency conversions</Table.Caption> -->
            <Table.Header>
              <Table.Row>
                <Table.Head class="w-[40px]">From</Table.Head>
                <Table.Head class="w-[40px]">Amount</Table.Head>
                <Table.Head class="w-[40px]">To</Table.Head>
                <Table.Head class="w-[80px]">Result</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each resultsList as result, i (i)}
                <Table.Row>
                  <Table.Cell class="font-medium">{result.from}</Table.Cell>
                  <Table.Cell class="">{amount}</Table.Cell>
                  <Table.Cell class="font-medium">{result.to}</Table.Cell>
                  <Table.Cell class="">{result.result}</Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </div>

      {:else}
        {@html message||''}
      {/if}
      
    </div>

    {#if result?.messages?.length > 0}
        <div class="detail-trace | mt-4 overflow-scroll max-h-48">
          <div class="text-slate-400/80 font-bold text-xs pb-2">generative output details</div>
            {#each result.messages as message}
              {#if message.content}
                <pre class="overflow-scroll mb-1 | text-slate-400 whitespace-break-spaces bg-slate-200/50 text-xs"><div class="font-bold">{message.role}</div>{message.content}</pre>
              {/if}
            {/each}
        </div>
      {/if}
  {/if}

  <div class="footer | text-xs text-blue-300 rounded-md mt-3 -mb-1 p-4 pl-0 py-1">
    Conversion data is limited and may be incorrect
  </div>
</div>

