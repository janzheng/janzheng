<script>

  import * as chrono from 'chrono-node';
	import { immerStore, History } from 'svelte-immer-store';

	import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";

  import Icon from '@iconify/svelte';
	import { Rocket, LightningBolt, ChevronDown, Width, Calendar as CalendarIcon } from "radix-icons-svelte";
  
  import { tick } from "svelte";
  import { CalendarDate, today, DateFormatter, getLocalTimeZone } from "@internationalized/date";
  import { cn } from "$lib/utils";

  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.ts";
  import * as Command from "$lib/components/ui/command/index.ts";

  // import currencyList from './short-currencies.json';
  import currencyList from './currencies.json';


  let errorMessages, message, requests=[], results=[], resultString;

  export let currencyData$ = immerStore({
    from: 'USD',
    to: 'AUD',
    amount: 100,
    date: today(getLocalTimeZone()),
  });

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

	const from$ = currencyData$.select(state => state.from);
	const to$ = currencyData$.select(state => state.to);
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
  
  let fromOpen, toOpen, calOpen;
 
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId) {
    fromOpen = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }


  async function doConvert(currencyData) {
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
              date: today(getLocalTimeZone())
            }
          }
        ]
      }
      console.log('Sending data...', postData);
      requests = [...requests, postData];
      const response = await fetch('https://coverflow.deno.dev/execute', {
      // const response = await fetch('http://localhost:9999/execute', {
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
        let result = await response.json()

        if(result.error) {
          message = result.error;
          if(result.error == 'HTTP error! status: 404') {
            message = 'Sorry, the exchange rate for this date was not found.'
          }
          return
        }
        console.log("Received data:", result)
        message = `Total amount in ${$to$}: ${currencies.filter(cur => cur.value === $to$)[0].symbol}${result.data.result}`;
      }
    } catch (error) {
      console.error('An error occurred while converting:', error, error.message);
      message = 'An error occurred while converting.';
    }
  }


</script>


<div class="Converter simple-converter | py-4 px-2 rounded-md bg-sky-50 mb-4 shadow-sm shadow-blue-200/80 | border border-blue-100">

  <div class="ui-group flex flex-row items-center gap-1">

    <span class="hidden md:inline | pr-1 md:w-8 text-right text-sm text-gray-500">{currencies.filter(cur => cur.value === $from$)[0].symbol}</span>
    <Input type="number" placeholder="Amount" class="bg-white w-12 min-w-[60px] md:w-16 px-2 | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100" bind:value="{$amount$}" />
  
    <Popover.Root bind:open={fromOpen} let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          aria-expanded={fromOpen}
          class="min-w-[70px] flex-1 px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100"
        >
          <!-- {currencies.filter(cur => cur.value === $from$)[0].symbol} -->
          <span>{$from$}</span>
          <!-- <span class="text-sm text-gray-500 baseline">
            {currencies.filter(cur => cur.value === $from$)[0].name}
          </span> -->
          <ChevronDown class="h-4 w-4" />
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
          class="min-w-[70px] flex-1  px-2 justify-between | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100"
        >
          <span>{$to$}</span>
          <!-- <span class="text-sm text-gray-500 baseline">
            {currencies.filter(cur => cur.value === $to$)[0].name}
          </span> -->
          <ChevronDown class="h-4 w-4" />
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
            "hidden | flex-1 px-1 md:px-4 md:w-[240px] justify-start text-left font-normal overflow-hidden | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100",
            !$date$ && "text-muted-foreground"
          )}
          builders={[builder]}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {$date$ && $date$?.toDate ? df.format($date$?.toDate(getLocalTimeZone())) : "Pick a date"}
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start">
        <Input type="text" placeholder="Enter a date (e.g. 'yesterday')" class="w-full inline-block | border-2 border-blue-400 focus-visible:ring-blue-400/40 " 
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
  
    <Button 
        on:click={() => {
          doConvert($currencyData$);
        }}
        variant="outline" 
        class="cursor-pointer w-16 md:w-32 h-9 | border border-blue-400 hover:border-blue-900 hover:bg-blue-100/20 focus-visible:ring-blue-400/100"
         >
        <Label class="cursor-pointer">
          <Icon class="w-6 h-6 text-blue-800" icon="ph:calculator-duotone" />
          <!-- <Icon class="w-6 h-6 text-blue-800" icon="ph:sparkle-duotone" /> -->
          <!-- <Rocket class="h-5 w-5 text-blue-800" /> -->
          <!-- <LightningBolt class="h-5 w-5 text-blue-800" /> -->
          <!-- <span class="">🚀</span> -->
        </Label>
      </Button>
  </div>

  {#if message}
    <div class="message-group | text-sm rounded-md mt-3 -mb-1 p-4 bg-white">
      {message||''}
    </div>
  {/if}

  <div class="footer | text-xs text-blue-300 rounded-md mt-3 -mb-1 p-4 py-1">
    Conversion data is limited and may be incorrect
  </div>
</div>


<style lang="scss" global>
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
</style>