{#if false}
    <slot />
{/if}
<div>

</div>

{#if format}
  <figure
    id={`_block-${block.id}`}
    class="notion-asset-wrapper notion-image {isFullWidth ? 'notion-image-fullwidth' : ''}"
    style={`width: 100%; max-width: ${block_width}px`}>
    <div class="image-container">
      {#if block_aspect_ratio}
        <img class="notion-image-inset" {alt} {src} loading="lazy" />
      {:else}
        <img {alt} {src} loading="lazy" />
      {/if}
    </div>
    {#if block.properties.caption}
      <figcaption class="notion-image-caption">
        <FormattedText {block} />
      </figcaption>
    {/if}
  </figure>
{/if}

<script>
    import { getTextContent, toNotionImageUrl } from '../utils.js'
    import FormattedText from '../subcomponents/FormattedText.svelte'
    export let block = {}; block;
    export let blocks = []; blocks;
    export let fullPage = false; fullPage;
    export let api = null; api;
    export let siteSrc; siteSrc;

    if(block.properties.title)
      block.properties.title = null; // notion sometimes adds "untitled" as the title, which we don't need
    const format = block.format ? block.format : null
    const { block_aspect_ratio, block_width } = format ? format : {}
    const alt = block.properties.caption ? block.properties.caption[0][0] : ''
    let src = getNotionImageLink(block.format?.display_source) || // this one displays the raw link to a linked image
        (block.properties.source ? toNotionImageUrl(block.properties.source[0][0], block.id, siteSrc) : '')

    const isFullWidth = format?.isFullWidth || block_width > 800 // Use a fixed threshold instead

  export function getNotionImageLink(imageUrl) {
    /* 
      we want rawUrl whenever possible, EXCEPT when it contains "https://prod-files-secure.s3" which doesn't render properly
    */
  if(!imageUrl) return null
  
    let url // = notionImage?.Content // defunct; images should be in .Cover or other explicit URL fields! Many items use .Content for text

    // console.log('fileObj:',fileObj)
    const links = ["https://prod-files-secure.s3", "//s3-us-west-2.amazonaws"];
    if (!url) url = links.some(link => imageUrl?.includes(link)) ? null : imageUrl;
    return url
  }

</script>

<style>
  figure {
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
    overflow: hidden;
  }

  .image-container {
    width: 100%;
    position: relative;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  figcaption {
    width: 100%;
    padding: 8px 0;
  }
</style>
