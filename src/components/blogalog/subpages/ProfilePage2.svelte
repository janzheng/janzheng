
<svelte:head>
  {#if blogalogData?.header}
    <title>{blogalogData?.header?.title || 'Blogalog'}</title>
  {/if}
</svelte:head>


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
                <!-- {#if socialLinks}
                  <div class="Profile-Header-SocialBox-Container | {blogalogData?.styles?.profile['profileSocials']} ">
                    <SocialBox {email} socialText={socialLinks} />
                  </div>
                {/if} -->
                {#if blogalogData?.meta['shortDescription']}<div class="Profile-Header-ShortDescPara | text | {blogalogData?.styles?.profile['profileShortDescPara']} ">{@html marked(blogalogData?.meta['shortDescription'] || '') }</div>{/if}
                {#if blogalogData?.meta['location']}<div class="Profile-Header-Location | text pfix | {blogalogData?.styles?.profile['location']}">{@html marked(blogalogData?.meta['location'] || '') }</div>{/if}
              </div>
            </div>
          </div>
        {/if}
      
        {#if blogalogData?.styles?.profile['longDescription']}
          <div class="Profile-Header-LongDesc | {blogalogData?.styles?.profile['longDesc']}">
            {@html marked(blogalogData?.meta['longDescription'] || '')}
          </div>
        {/if}
      {/if}
    </div>


</div>




<script>
  import { marked } from '@components/blogalog/utils/markdownit.js';
  export let blogalogData, classes;
</script>


<!-- janzheng profile styles -->
<style lang="postcss">

  .content-pad {
    @apply px-8 md:px-32 py-8 mx-auto;
    /* max-width: var(--notion-page-width); */
  }

  .content-custom-width {
    max-width: var(--blogalog-page-custom-width);
    margin-left: auto;
    margin-right: auto;
  }
  
  .content-notion-wide {
    max-width: var(--blogalog-page-width, 704px);
    margin-left: auto;
    margin-right: auto;
  }

  .content-notion-wider {
    max-width: calc(var(--notion-page-width) + 224px);
    margin-left: auto;
    margin-right: auto;
  }
  .notion-callout-icon {
    align-self: flex-start;
  }
  .notion-page-icon {
    font-size: 1.7rem;;
  }

  .Profile {
    background-color: var(--color-bg);
  }

  .Profile-Row-Main {
    h2, h3, h4 {
      &:first-of-type {
        @apply pt-1; /* tiny padding for first header keeps it tighter */
      }
    }
  }




  @keyframes fast-pulse {
    0% {
      transform: scale(1);
      opacity: 1;
      background-color: #4caf50;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
      background-color: #81c784;
    }
    100% {
      transform: scale(1);
      opacity: 1;
      background-color: #4caf50;
    }
  }

  .animate-fast-pulse {
    animation: fast-pulse 1.4s infinite;
  }

</style>