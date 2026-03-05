{#if href}
  <blockquote id={`_block-${block.id}`} class="twitter-tweet">
    <a {href}>Tweet from {href}.</a>
  </blockquote>
{/if}

<script>
  import { onMount } from 'svelte'
  import { loadTwitter } from '../utils.js'
  import FormattedText from '../subcomponents/FormattedText.svelte'
  export let block = {}; block;
  export let blocks = []; blocks;
  export let fullPage = null; fullPage;
  export let api = null; api;
  export let siteSrc; siteSrc; 

  let href
  if (block.properties && block.properties.source) href = block.properties.source[0][0]
  if (href) {
    href = href.replace('x.com', 'twitter.com')
  }

  onMount(async () => {
    loadTwitter()
  });

</script>
