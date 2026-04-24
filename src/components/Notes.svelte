<script>
  import { getContext } from 'svelte';
  import { buildPageOrder, parseYaml, getNotionImageLink } from './blogalog/utils/index.js';
  import { componentTypes } from './blogalog/utils/componentTypes.js';
  import { userData } from './blogalog/utils/stores.js';
  import { marked } from '@components/blogalog/utils/markdownit.js';
  import { md } from './blogalog/utils/markdownit.js';
  import { niceDate } from './blogalog/utils/date.js';
  import './blogalog/styles/blogalog.scss';

  export let blogalogData, classes, groupName = 'Notes';
  export let title = 'Notes & Thoughts';
  
  let pageOrder = buildPageOrder({sitePages: blogalogData.pages});
  let settings = blogalogData?.settings;

  let blogData = getContext('blogData');
  let blogPath = "";

  function getCover(post) {
    return post.cover || post.files?.[0] || null;
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
    {@const settings = row?.yaml && parseYaml(row?.yaml, row) || null}
    <!-- {@const settings = row?.yaml && parseYaml(row?.yaml) || null} -->
    {@const rowPageStyles = (settings?.page && generatePageStyles(settings.page, {type: 'string'})) || ''}
    {#if row.name && row.hide == true}
      <!-- do nothing if hidden -->
    {:else}
      <span id={settings?.id || 'row-'+rowIndex} class="row-anchor {blogalogData.settings?.anchor?.class}"></span>
      <div class="Profile-Row-Wrapper" style={rowPageStyles + '; ' + settings?.row?.wrapper?.style||''}>
        <!-- special rows outside of standard row; for formatting usually -->

        <div class="Profile-Row-Container | {settings?.row?.container?.class || blogalogData?.styles?.profile?.defaultRowContainer}  | " style={settings?.row?.container?.style||''}>

          {#if row?.type?.includes('Group') && row.group === groupName}

            <div class="text-2xl font-title font-bold text-center mt-16">{title}</div>

            <div class="Profile-Row--Group Profile-Row--Posts | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow + ' | my-2 '} ">
              <div class="Posts Posts-list | grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6   | {settings?.posts?.class || ''} ">
                {#each row.pages.filter(page => page?.type?.includes("Posts") && !page.hide && page.status !== "draft") as post}
                  <div class="Post-item | block ">
                    <div class="Post-item-wrapper">
                      <a class="Post-link | block relative hover:after:opacity-100 after:opacity-0 after:z-0 after:absolute after:-inset-2 after:rounded-md after:bg-slate-100" href={blogPath + post.path}>
                        <div class="Post-main relative z-10 {settings?.post?.main?.class || ''}">
                          <span class="Post-name text-lg pfix">{@html md.strip(md.render(post.name))}</span>
                          {#if post.content}<div class="Post-content text pt-1 text-base">{@html marked(post.content || '')}</div>{/if}
                          {#if post.date}
                            <span class="Post-date text block text-base text-sm mb-1 pfix">{new Date(post.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</span>
                          {/if}
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

