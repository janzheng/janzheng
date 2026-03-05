<script>
  import { getContext } from 'svelte';
  import { buildPageOrder, parseYaml, getNotionImageLink } from './blogalog/utils/index.js';
  import { componentTypes } from './blogalog/utils/componentTypes.js';
  import { userData } from './blogalog/utils/stores.js';
  import { marked } from 'marked';
  import { md } from './blogalog/utils/markdownit.js';
  import { niceDate } from './blogalog/utils/date.js';
  import './blogalog/styles/blogalog.scss';

  export let blogalogData, classes, groupName = 'Exploration';
  export let title = 'Explorations';
  
  let pageOrder = buildPageOrder({sitePages: blogalogData.pages});
  let settings = blogalogData?.settings;

  let blogData = getContext('blogData');
  let blogPath = "";

  console.log('blogalogData', blogalogData)

  function getCover(post) {
    return getNotionImageLink(post);
  }

  let postsSettings = settings;
</script>

<style lang="scss" global>
  @media (min-width: 1024px) {
    .Cover-image-container {
      overflow: hidden;
    }
  }

  // don't underline text
  .Post-item {
    a {
      text-decoration: none !important;
      .Post-date {
        @apply text-blue-950;
      }
      .Post-name {
        @apply text-blue-900;
      }

      &:hover {
        .Post-name {
          // text-decoration: underline;
          text-decoration: var(--link-hover-decoration, underline);
          text-decoration-thickness: var(--link-hover-decoration-thickness, auto);
        }
      }
    }
  }
  @media (min-width: 1024px) {
    .Cover-image-container {
      overflow: hidden;
    }
  }

  .Post-item {
    a {
      text-decoration: none !important;

      &:hover {
        .Post-name {
          text-decoration: var(--link-hover-decoration, underline);
          text-decoration-thickness: var(--link-hover-decoration-thickness, auto);
        }
      }
    }
  }
</style>



<div class="BlogalogRows | Blogalog-Container | {classes}">

  {#each pageOrder as row, rowIndex }
    {@const settings = row?.YAML && parseYaml(row?.YAML, row) || null}
    <!-- {@const settings = row?.YAML && parseYaml(row?.YAML) || null} -->
    {@const rowPageStyles = (settings?.page && generatePageStyles(settings.page, {type: 'string'})) || ''}
    {#if row.Name && row.Hide == true}
      <!-- do nothing if hidden -->
    {:else}
      <span id={settings?.id || 'row-'+rowIndex} class="row-anchor {blogalogData.settings?.anchor?.class}"></span>
      <div class="Profile-Row-Wrapper" style={rowPageStyles + '; ' + settings?.row?.wrapper?.style||''}>
        <!-- special rows outside of standard row; for formatting usually -->

        <div class="Profile-Row-Container | {settings?.row?.container?.class || blogalogData?.styles?.profile?.defaultRowContainer}  | " style={settings?.row?.container?.style||''}>

          {#if row?.Type?.includes('Group') && row.Group === groupName}

            <div class="text-2xl font-title font-bold text-center mt-16">{title}</div>
            <div class="Profile-Row--Group Profile-Row--Posts | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow + ' | my-2 '} ">
              <div class="Posts Posts-list | flex flex-wrap gap-x-6 gap-y-6 | {settings?.posts?.class || ''} ">
                {#each row.Pages.filter(page => page?.Type?.includes("Posts") && !page.Hide && page.Status !== "Draft") as post}
                  <div class="Post-item | flex flex-col w-full md:w-[calc(50%-1.5rem)] ">
                    <div class="Post-item-wrapper flex flex-col flex-grow">
                      <a class="Post-link | flex flex-col flex-grow relative hover:after:opacity-100 after:opacity-0 after:z-0 after:absolute after:-inset-2 after:rounded-md after:bg-slate-100" href={blogPath + post.Path}>
                        <div class="Post-main relative z-10 flex flex-col flex-grow gap-2 {settings?.post?.main?.class || ''}">
                          {#if getCover(post)}
                            <div class="Cover-image-container">
                              <img src={getCover(post)} alt="Cover Image" class="max-h-64 max-w-5xl" />
                            </div>
                          {/if}
                          <div class="Post-content-wrapper ">
                            <span class="Post-name text-lg pfix block">{@html md.strip(md.render(post.Name))}</span>
                            {#if post.Content}<div class="Post-content text pt-1 text-base">{@html marked(post.Content || '')}</div>{/if}
                            {#if post.Date}
                              <span class="Post-date text block text-base text-sm mb-1 pfix">{new Date(post.Date?.start_date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</span>
                            {/if}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  {/each}

</div>

