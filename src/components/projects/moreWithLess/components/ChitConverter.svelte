<script>

  import { CalendarDate, today, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import { Button } from "$lib/components/ui/button/index.ts";
  // import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label/index.ts";
  import Icon from '@iconify/svelte';
	import { MagicWand, LightningBolt, Calendar as CalendarIcon } from "radix-icons-svelte";
  import { cn } from "$lib/utils";

  export let showTrace = false;
  let message = '';
  let errorMessages, requests=[], results=[], result;
  export let cta = "USD → AUD", prompt = "what's $100 USD to AUD?"

  async function doConvert(prompt) {
    message='🤔';
    
    try {
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
      const response = await fetch('https://coverflow-v3.yawnxyz.deno.net/execute', {
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
        message = ''
        result = await response.json()
        results = [...results, result];
        console.log('result', result)
        if(result?.data) {
          message = result?.data?.text;
        }
      }
    } catch (error) {
      console.error('An error occurred while converting:', error);
      message = 'An error occurred while converting.';
    }
  }


</script>


<div class="ChitChatConverter | mb-4 md:mb-2 ">

  <div class="ui-group flex flex-col justify-center | md:flex-row md:items-center md:justify-normal | gap-1 ">
    <Button 
        on:click={() => {
          doConvert(prompt);
        }}
        variant="outline" 
        class="cursor-pointer px-4 h-10 w-48 | border border-blue-200 hover:border-blue-300 hover:bg-blue-100/20 focus-visible:ring-blue-400/100"
    >
        <Label class="cursor-pointer | flex items-center gap-1">
          {cta}
          <!-- <MagicWand class="inline h-4 w-4" /> -->
          <Icon class="ml-2 w-6 h-6 text-blue-800" icon="ph:sparkle-duotone" />
          <!-- <LightningBolt class="h-5 w-5 text-blue-800" /> -->
        </Label>
    </Button>


    {#if message}
      <div class="ml-4 mt-0">{@html message||''}</div>
    {:else}
      <span class="ml-4 text-slate-600 text-sm">Prompt: {prompt}</span>
    {/if}
  </div>
  {#if showTrace && result?.messages?.length > 0}
    <div class="detail-trace | mt-4 overflow-scroll max-h-48">
      <div class="text-slate-400/80 font-bold text-xs pb-2">generative output details</div>
        {#each result.messages as message}
          {#if message.content}
            <pre class="overflow-scroll mb-1 | text-slate-400 whitespace-break-spaces bg-slate-200/50 text-xs"><div class="font-bold">{message.role}</div>{message.content}</pre>
          {/if}
        {/each}
    </div>
  {/if}
</div>

