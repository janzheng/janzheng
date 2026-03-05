<!-- 

  Displays blog posts, etc.

 -->


<script>
  import './styles/blogalog.scss';

  import { marked } from 'marked'
  import dayjs from 'dayjs'

  import { generatePageStyles, parseYaml, getNotionImageLink, getPageBlocks } from './utils/index.js'
  import { niceDate } from './utils/date.js';
  import { md } from './utils/markdownit.js'
  import { plainRenderer } from './utils/marked.js';

  import Notion from "@components/sveltekit-notion/src/Notion.svelte";

  export let blogalogData={}, currentPost={}, classes=""
  export let heightOfFooter;
  let styleString = blogalogData.settings?.page && generatePageStyles(blogalogData.settings?.page, {type: 'string'});

  console.log('currentPost', blogalogData, currentPost)

  let blogPath = "/";
  

</script>





<svelte:head>
  <!-- <title>{marked(currentPost?.Name || '', {renderer: plainRenderer()})}</title> -->
  <title>{currentPost?.Name}</title>

  <!-- <title>{blogalogData.header?.title}</title> -->
  <meta name="description" content={blogalogData.header?.description}>
  <link rel="canonical" href={blogalogData.header?.canonical}>
  
  {#if blogalogData.header?.links}
    {#each blogalogData.header.links as link}
      <link rel={link.rel} type={link.type} href={link.href}>
    {/each}
  {/if}
<!-- 
  <link rel="icon" type="image/jpeg" href={blogalogData.header?.ico}>

  <meta property="og:title" content={blogalogData.header?.openGraph?.title}>
  <meta property="og:description" content={blogalogData.header?.openGraph?.description}>
  <meta property="og:url" content={blogalogData.header?.openGraph?.url}>
  <meta property="og:image" content={blogalogData.header?.openGraph?.image}>

  <meta name="twitter:card" content={blogalogData.header?.twitter?.card}>
  <meta name="twitter:site" content={blogalogData.header?.twitter?.site}>
  <meta name="twitter:title" content={blogalogData.header?.twitter?.title}>
  <meta name="twitter:description" content={blogalogData.header?.twitter?.description}>
  <meta name="twitter:image" content={blogalogData.header?.twitter?.image}>
  <meta name="twitter:image:alt" content={blogalogData.header?.twitter?.imageAlt}> -->
</svelte:head>


<div 
  class="BlogalogPostPage | Blogalog-Container | {classes||""} "
  style="{styleString+";"||''} {heightOfFooter ? `min-height: calc(100vh - ${heightOfFooter + 20}px);` : ''}"
>

  <div class="PostPage | PostPage-Header | notion-page-wrapper pt-12 bg-gray-100 pb-8">
    <!-- BACK LINK / PROFILE INFORMATION -->
    <div class="notion-page wrapper max-w-[--blogalog-post-width]">
      <div class="ProfileStack | mb-8">
        <a href="{blogPath}" style="" class="flex items-center">
          {#if blogalogData?.meta?.profileImage}
            <div class="ProfileImage |">
              <img class="w-16 h-16 | inline-block | object-cover rounded-full border-solid border-4 border-white overflow-hidden" src="{blogalogData?.meta?.profileImage}" alt="Profile" />
            </div>
          {/if}
          {#if blogalogData?.meta?.author}
            <div class="text-lg font-medium | inline-block ml-2">{blogalogData?.meta?.author}</div>
          {/if}
        </a>
      </div>
  
  
      {#if currentPost?.Cover && blogalogData?.settings?.post?.hideCover != true}
        <div class="CoverImage-container | mt-4">
          <img alt="CoverImage header " src="{currentPost?.Cover}" />
        </div>
      {/if}
  
  
      <div class="PostPage-Meta">
        {#if currentPost?.Date?.start_date}
          <div class="PostPage-Meta-Date | mb-4">{niceDate(currentPost?.Date?.start_date||'')}</div>
        {/if}
      </div>
  
      {#if currentPost?.Name}
        <h1 class="PageContent-Name !mb-0 {blogalogData?.settings?.post?.page?.title?.class || 'mb-0 pfix'}" style="padding-top: 0; padding-bottom: 0;">{@html md.strip(md.render(currentPost?.Name||''))}</h1>
      {/if}
  
      {#if currentPost.AuthorName && currentPost.AuthorName !== 'undefined' }
        {#if currentPost.AuthorName.includes('\n')}
          {#each currentPost.AuthorName.split('\n') as name, index}
            <div class="flex items-center mb-1">
              {#if currentPost.AuthorProfile?.[index]}
                <div class="rounded-full overflow-hidden mr-2">
                  <img class="w-8 h-8" src="{currentPost.AuthorProfile[index]?.rawUrl || currentPost.AuthorProfile[index]?.url}" alt="Author Profile" />
                </div>
              {/if}
              <div>{name}</div>
            </div>
          {/each}
        {:else}
          <div class="Posts-Author | mt-1 mb-4 flex items-center">
            {#if currentPost.AuthorProfile?.[0] }
              <div class="rounded-full overflow-hidden mr-2">
                <img class="w-8 h-8" src="{currentPost.AuthorProfile?.[0]?.rawUrl || currentPost.AuthorProfile?.[0]?.url}" alt="Author Profile" />
              </div>
            {/if}
            {#if currentPost.AuthorName && currentPost.AuthorName !== 'undefined' }
              <div>{currentPost.AuthorName}</div>
            {/if}
          </div>
        {/if}
      {/if}
  
      {#if currentPost.Categories }
        {#if Array.isArray(currentPost.Categories) && currentPost.Categories.length > 0}
          <div class="mt-2">
            {#each currentPost.Categories as cat}
              <span class="Category text-xs py-2 px-2 text-gray-800 bg-gray-200/50 border-gray-100 | mr-2">{cat}</span>
            {/each}
          </div>
        {:else}
          <span class="Category text-xs py-2 px-2 text-gray-800 bg-gray-100 border-gray-100 | mr-2">{currentPost.Categories}</span>
        {/if}
      {/if}
  
  
      {#if currentPost?.Content}
        <div class="PageContent-Content text-xl | mt-4 mb-8">{@html md.render(currentPost?.Content)}</div>
      {/if}
  
      {#if currentPost?.Link}
        <div class="PageContent-Link">
          {#if currentPost.Link.startsWith('<a')}
            {@html currentPost.Link}
          {:else if currentPost.Link.startsWith('https://')}
            <a href="{currentPost?.Link}">{currentPost?.Link}</a>
          {:else}
            {@html md.render(currentPost?.Link)}
          {/if}
        </div>
      {/if}
    </div>
  </div>


  <div class="PostPage | mt-16">
    <div class="content-container">
      {#if currentPost?.pageBlocks || blogalogData?.meta?.crossPages[currentPost?.CrossPageId]}
        <div class="PageContent-Blocks post | my-4">
          <Notion classes="notion" loud={true} blocks={getPageBlocks(currentPost?.pageBlocks, blogalogData) || getPageBlocks(blogalogData?.meta?.crossPages[currentPost?.CrossPageId], blogalogData)} ></Notion>
        </div>
      {/if} 
      <slot></slot>
    </div>
  </div>
</div>


<style lang="scss" global>

  .notion-callout-icon {
    align-self: flex-start;
  }
  .notion-page-icon {
    font-size: 1.7rem;;
  }

  .notion-bookmark {
    &, &:hover, a, a:hover {
      text-decoration: none !important;
    }
  }

  .Profile {
    background-color: var(--color-bg);
  }

  :global(figure) {
    @apply mb-8;
  }

  :global(.notion-page) {
    max-width: var(--blogalog-post-width) !important;
    display: grid;
    width: 100%;
    
    @media (min-width: 768px) {
      grid-template-columns: 
        [full-start] minmax(6rem, 1fr)
        [main-start] min(var(--blogalog-post-width), calc(100% - 12rem))
        [main-end] minmax(6rem, 1fr)
        [full-end];
    }
  }

  :global(.notion-page-wrapper) {
    width: 100%;
    max-width: var(--blogalog-post-width);
    margin: 0 auto;
    grid-column: full-start / full-end;
  }

  :global(.PostPage) {
    margin-left: auto;
    margin-right: auto;
    max-width: none !important;
  }

  // Default content stays in main column
  :global(.notion-page > *) {
    grid-column: main;
  }

  // Fullwidth images span the entire grid
  :global(figure.notion-image-fullwidth) {
    grid-column: full-start / full-end;
    width: 100%;
    // max-width: none !important;
    
    // Ensure the image inside also stretches
    img {
      width: 100%;
      max-width: none !important;
      margin: 0 auto;  // Centers the image horizontally
      display: block;  // Removes any inline spacing
      max-width: 100%; // Ensures image doesn't overflow
    }
  }

  :global(p + ol, p + ul) {
    margin-top: 20rem;
  }

  :global(.notion-inline-code) {
    overflow-wrap: anywhere
  }
  :global(.notion-code) {
    @media (max-width: 768px) {
      max-width: 400px; // Change to full width in mobile views
    }
  }
  
  .BlogalogPostPage {
    // overflow-x: hidden;
    max-width: 100%;
  }
  

</style>