<script>

  import { CalendarDate, today, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import { Button } from "$lib/components/ui/button/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	// import { MagicWand, LightningBolt, Rocket, ChevronDown, Width, Calendar as CalendarIcon } from "radix-icons-svelte";
  // import { cn } from "$lib/utils";
  import Icon from '@iconify/svelte';

  let errorMessages, message, thinking, steps, requests=[], results=[], result;
  // export let promptStr = "what's $100 USD to AUD?"
  export let promptStr = "what's 100 us dollars in uk money?"

  async function doConvert(promptStr) {
    message='Thinking...';
    
    try {
      let postData = {
        "pipeline": [
          {
            "name": "ai",
            "settings": {
              "tools": [
                "getCurrency"
              ],
              "prompt": `${promptStr} | Today's date is ${today(getLocalTimeZone())}`,
              "model": "llama3-groq-8b-8192-tool-use-preview",
              "provider": "groq"
            }
          }
        ]
      }
      thinking = true;
      requests = [...requests, postData];
      const response = await fetch('https://coverflow-v3.yawnxyz.deno.net/execute', {
      // const response = await fetch('http://localhost:9999/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      message='';
      if (!response.ok) {
        message = "Oops!"
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        message = ""
        result = await response.json()
        results = [...results, result];
        console.log('result', result)
        thinking = false;
        if(result?.data) {
          message = `Amount: ${result?.data?.text}`;
          steps = result?.data?.steps;
        }
      }
    } catch (error) {
      console.error('An error occurred while converting:', error);
      message = 'An error occurred while converting.';
    }
  }

</script>


<div class="ChatConverter | py-4 px-2 rounded-md bg-sky-50 mb-4 shadow-sm shadow-blue-200/80 | border border-blue-100 ">

  <div class="ui-group flex flex-row items-center gap-1">

    <Input 
        type="text" 
        placeholder="ex: Convert $100 AUD to USD" 
        class="bg-white w-full px-2 | border-blue-200 hover:border-blue-300 hover:bg-white/40 focus-visible:ring-blue-400/100" 
        bind:value="{promptStr}" 
        on:keydown={(e) => {
          if(e.key === 'Enter') {
            doConvert(promptStr);
          }
        }}
    />

    <Button 
        on:click={() => {
          doConvert(promptStr);
        }}
        variant="outline" 
        class="cursor-pointer w-16 md:w-32 h-9 | border border-blue-400 hover:border-blue-900 hover:bg-blue-100/20 focus-visible:ring-blue-400/100"
    >
        <Label class="cursor-pointer ">
          <!-- <Icon class="w-6 h-6 text-blue-800" icon="ph:sparkle-duotone" /> -->
          <Icon class="w-5 h-5 text-blue-800" icon="ph:chat-circle-duotone" />
          <!-- <LightningBolt class="h-5 w-5 text-blue-800" /> -->
          <!-- <span class="">✨</span>-->
        </Label>
    </Button>
  </div>

  {#if message}
    <div class="message-group | text-sm rounded-md mt-3 -mb-1 p-4 bg-white">
      {@html message||''}
      {#if results && results.length > 0}
        <div class="detail-trace | mt-4 overflow-scroll max-h-48">
          <div class="text-slate-400/80 font-bold text-xs pb-2">tool calling details</div>
          {#if thinking}
            <pre class="overflow-scroll mb-1 | text-slate-400 whitespace-break-spaces bg-slate-200/50 text-xs"><div class="font-bold">Thinking</div>{thinking}</pre>
          {/if}
          {#each steps as step}
            <pre class="overflow-scroll mb-1 | text-slate-400 whitespace-break-spaces bg-slate-200/50 text-xs"><div class="font-bold">Step</div>{JSON.stringify(step)}</pre>
          {/each}
        </div>
      {/if}
    </div>
  {/if}


  <div class="footer | text-xs text-blue-300 rounded-md mt-3 -mb-1 p-4 pl-2 py-1">
    Conversion data is limited and may be incorrect
  </div>
</div>

