<script>
  import './styles/blogalog.scss';

  import { buildPageOrder, parseYaml, generatePageStyles } from './utils/index.js';
  import SocialBox from './subcomponents/Socialbox.svelte';
  export let blogalogData, classes
  export let heightOfFooter;
  let styleString = blogalogData.settings?.page && generatePageStyles(blogalogData.settings?.page, {type: 'string'});
  let showLongDesc = false;

  // console.log("blogalogData:", blogalogData);

</script>







<svelte:head>

  {#if blogalogData?.header}
    <title>{blogalogData?.header?.title || 'Blogalog'}</title>
  {/if}

  <!-- <title>{blogalogData.header?.title}</title> -->
  <meta name="description" content={blogalogData.header?.description}>
  <link rel="canonical" href={blogalogData.header?.canonical}>
  
  {#if blogalogData.header?.links}
    {#each blogalogData.header.links as link}
      <link rel={link.rel} type={link.type} href={link.href}>
    {/each}
  {/if}

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
  <meta name="twitter:image:alt" content={blogalogData.header?.twitter?.imageAlt}>
</svelte:head>




<div 
  class="BlogalogProfile | Blogalog-Container | {classes}"
  style="{styleString+";"||''} {heightOfFooter ? `min-height: calc(100vh - ${heightOfFooter + 20}px);` : ''}"

>
  <!-- <ProfilePage {blogalogData}/> -->

  {#if !blogalogData}
    <div class="Profile-NotFound | content-notion-wide | mt-24 rounded-sm overflow-hidden text-center">
      <h1 class="text-2xl font-bold">Profile not found!</h1>
    </div>
  {/if}

  <div class="Profile | {classes}">
    <div class="Profile-Header | {blogalogData?.styles?.profile['header']} " class:hidden={blogalogData?.styles?.profile?.showHeader == false}>
      {#if blogalogData?.styles?.profile['coverImage']}
        <div class="Profile-CoverImage-Container | {blogalogData?.styles?.profile['coverContainer']}">
          <img class="Profile-CoverImage {blogalogData?.styles?.profile['coverImage']}" src="{blogalogData?.meta['coverImage']}" alt="Cover" />
        </div> 
      {/if}
      
      {#if blogalogData?.styles?.profile['showProfile'] !== false}
        <!-- profile -->
        {#if blogalogData?.styles?.profile['profileImage']}
          <div class="Profile-Header-ProfileImage-Container | {blogalogData?.styles?.profile['profileImageContainer']}  | md:min-h-[10rem] sm:min-h-[7rem] ">
            <div class="Profile-Header-ProfileImage-Box | {blogalogData?.styles?.profile['profileImageBox']} z-20 |">
              <img class="Profile-Header-ProfileImage | {blogalogData?.styles?.profile['profileImage']} |  {blogalogData?.styles?.profile['coverImage'] ? blogalogData?.styles?.profile['profileCoverImage'] : ''}" src="{blogalogData?.meta['profileImage']}" alt="Profile" />
              <div class="Profile-Header-ShortDesc | {blogalogData?.styles?.profile['profileShortDesc']}">

                {#if blogalogData?.styles?.profile['isAvailable']}
                  <div class="{blogalogData?.styles?.profile?.isAvailable?.wrapper?.class || 'pl-[2px] flex items-center'}">
                    <div class="{blogalogData?.styles?.profile?.isAvailable?.class || 'w-3 h-3 bg-green-500 rounded-full mr-2 animate-fast-pulse'}"></div>
                    <span>{blogalogData?.styles?.profile?.isAvailable?.text || 'Available for work'}</span>
                  </div>
                {/if}
                
                {#if blogalogData?.meta?.author}<div class="Profile-Header-Author font-title | {blogalogData?.styles?.profile['author']} ">{blogalogData?.meta?.author || ''}</div>{/if}
                {#if blogalogData?.meta?.socialLinks}
                  <div class="Profile-Header-SocialBox-Container | {blogalogData?.styles?.profile['profileSocials']} ">
                    <SocialBox email={blogalogData?.meta?.email} socialText={blogalogData?.meta?.socialLinks} />
                  </div>
                {/if}
                {#if blogalogData?.meta['shortDescription']}<div class="Profile-Header-ShortDescPara | text | {blogalogData?.styles?.profile['profileShortDescPara']} ">{@html blogalogData?.meta['shortDescription'] || '' }</div>{/if}
                {#if blogalogData?.meta['location']}<div class="Profile-Header-Location | text pfix | {blogalogData?.styles?.profile['location']}">{@html blogalogData?.meta['location'] || '' }</div>{/if}
              </div>
            </div>
          </div>
        {/if}
      
        {#if blogalogData?.styles?.profile['longDescription']}
          <div class="Profile-Header-LongDesc | | {blogalogData?.styles?.profile['longDesc']}">
            {#if showLongDesc}
              <div class="text-lg">
                {@html blogalogData?.meta['longDescription']}
              </div>
            {:else}
              <button 
                class="read-more-btn | px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                on:click={() => showLongDesc = true}
              >
                Read More
              </button>
            {/if}
          </div>
        {/if}
      {/if}

      <!-- manually moved this to below description, and manually showing it despite the "hidden" tag in the Notion setting -->
      {#if blogalogData?.meta?.socialLinks}
        <!-- override "hidden" from Notion to display it here instead of in rows -->
        <!-- <div class="Profile-Header-SocialBox-Container | {blogalogData?.styles?.profile['profileSocials']} "> -->
        <div class="Profile-Header-SocialBox-Container | text-3xl mt-8">
          <SocialBox email={blogalogData?.meta?.email} socialText={blogalogData?.meta?.socialLinks} />
        </div>
      {/if}
    </div>

  </div>
</div>


