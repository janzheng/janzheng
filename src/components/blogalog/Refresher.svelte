<script>
  import { PUBLIC_PROJECT_NAME, PUBLIC_FUZZYKEY_URL } from '$env/static/public';
  import { goto } from '$app/navigation';

  // import { onMount } from 'svelte';
  import { browser, dev } from '$app/environment';
  import Loader from '$plasmid/components/icons/loader.svelte';

  export let doReload = true
  
  export let data;
  let blogPath = data.blog.slug
  let isLoading = false;
  let isDone = false;
  let title = data.head?.title
  let counter = 0
  // let message = `Refresh data for: ${title} | ${blogPath}`;
  let message = `Refresh [${blogPath}]`;


  async function fetchData() {
    isLoading = true;
    message = 'Queuing refresh...'
    const response = await fetch(`/api/reload/${blogPath}?pageDataId=${data.blog?.pageDataId}`);
    // const response = await fetch(`https://www.blogalog.net/api/reload/${data.path}`);
    data = {...data, ...await response.json()};
    console.log('deploy/fetchData:', data);
    isLoading = false;
    isDone = true;
    counter = 0;

    pollData();

    // setTimeout(() => {
    //   message = `Refresh data for: ${title}`;
    // }, 15000);
  }

  // $: if (browser && dev) {
  //   console.log('[dev] Page Data:', data)
  // }



  let intervalId, timeCounter;

  async function pollData() {
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
      clearInterval(timeCounter);
    }

    // Store the initial metadata.created value
    let initialCreated = data?.created;

    // Start polling every 3 seconds
    intervalId = setInterval(async () => {
      const response = await fetch(`${PUBLIC_FUZZYKEY_URL}/?metadata=true&key=${PUBLIC_PROJECT_NAME}-${blogPath}`);
      const newData = await response.json();
      console.log('checking...', `${PUBLIC_FUZZYKEY_URL}/?metadata=true&key=${PUBLIC_PROJECT_NAME}-${blogPath}`, initialCreated, newData, newData?.metadata?.created)
      // If metadata.created has changed, clear the interval and update the message
      if (newData?.metadata?.created && newData?.metadata?.created !== initialCreated) {
        clearInterval(intervalId);
        clearInterval(timeCounter);
        message = `Refresh successful for [${blogPath}]`;

        if (doReload && browser) {
          // goto(window.location.href); // refresh
          location.reload();
        }
      }
    }, 3000);


    timeCounter = setInterval(async () => {
      counter += 1
      message = `Site is rebuilding... ${counter}s`
    }, 1000)
  }
   


  import { onDestroy } from 'svelte';

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<!-- deactivated for playground -->
<!-- 
<div class="Refresher | ">
  {#if isLoading}
    <div class="Refresher-loading">
      <div class="Btn-outline --short inline-block font-2xl inline-block text-gray-500 border-gray-200 cursor-default hover:bg-white hover:border-gray-200">
        <Loader /> {message}
      </div>
    </div>
  {:else if isDone}
    <div class="Refresher-done">
      <button class="Btn-solid --short --done" on:click={fetchData}>
        {message}
      </button>
    </div>
  {:else}
    <button class="Btn-solid --short --notDone" on:click={fetchData}>
      {message}
    </button>
  {/if}
</div> -->



<style lang="scss" global>

  .Refresher {
    --color-primary: #3b82f6;
    --color-primary-hover: #1d4ed8;
    --color-primary-text: #fff;
    --color-primary-text-hover: #fff;
  }

  .content-notion-wide {
    max-width: var(--blogalog-page-width, 704px);
    margin-left: auto;
    margin-right: auto;
  }

  .Btn-solid {
    @apply py-1 px-2 rounded-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-text)] hover:text-[var(--color-primary-text-hover)] border-[var(--color-primary)] hover:border-[var(--color-primary-hover)];
  }


</style>