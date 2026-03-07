
<script>
  import { getContext } from 'svelte';
  import { marked } from 'marked';
  import { md } from '../utils/markdownit.js'
  import { parseYaml, getNotionImageLink } from '../utils/index.js';
  import { niceDate } from '../utils/date.js';

  let blogData = getContext('blogData');

  export let posts;
  // export let settings;
  let blogPath = "";

  function getCover(post) {
    return post.cover || post.files?.[0] || null;
  }

  // for all posts settings / classes, we extract if from the first post in the group
  let settings = blogData?.settings
  let postsSettings = posts && posts.length > 0 && posts[0].yaml && parseYaml(posts[0].yaml) || settings;

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

      &:hover {
        .Post-name {
          // text-decoration: underline;
          text-decoration: var(--link-hover-decoration, underline);
          text-decoration-thickness: var(--link-hover-decoration-thickness, auto);
        }
      }
    }
  }
</style>






{#if posts}
  <!-- <div class="Posts-list | lg:grid grid-cols-3 gap-8"> -->
  <!-- <pre>postsSettings: {JSON.stringify(postsSettings, 0, 2)}</pre> -->
  <div class="Posts Posts-list | {postsSettings?.posts?.class || ''} ">
    {#each posts as post}
      <div class="Post-item | {postsSettings?.post?.class || 'mb-8'} ">
        <div class="Post-item-wrapper">
          <!-- -!!- blogPath[{blogPath}] - {post.path} -->
          <a href={`${blogPath}${post.path}`}>
            {#if post.type?.includes("CoverPost")}
              <!-- large image cover -->
              {#if post.cover || post.files?.length}
                <div class="Cover-image-container | pb-2">
                  <img class="Cover-image" src="{getCover(post)}" alt="Cover"/>
                </div>
              {/if}
              <span class="Post-name { postsSettings?.post?.name?.class || 'font-title text-2xl pfix'}">{@html md.strip(md.render(post.name))}</span>
              {#if post.date}
                <span class="Post-date text block text-base text-sm mb-1 pfix">{niceDate(post.date)}</span>
              {/if}
              {#if post.content}<div class="Post-content text pfix mt-1 mb-2 text-base">{@html marked(post.content || '')}</div>{/if}
            
            {:else}
              <!-- default -->
              <div class="Post-main {postsSettings?.post?.main?.class || ' flex justify-between gap-4'}">
                <div>
                  {#if post?.date}
                    <span class="Post-date text block text-base text-sm mb-1 pfix">{niceDate(post.date)}</span>
                  {/if}
                  <span class="Post-name { postsSettings?.post?.name?.class || 'font-title text-2xl pfix'}">{@html md.strip(md.render(post.name))}</span>
                  {#if post.content}<div class="Post-content text pt-1 text-base">{@html marked(post.content || '')}</div>{/if}
                </div>
              </div>
            {/if}
          </a>
        </div>

        {#if post.author && post.author !== 'undefined' }

          {#if post.author.includes('\n')}
            {#each post.author.split('\n') as name, index}
              <div class="flex items-center mb-1">
                {#if post.authorImage?.[index]}
                  <div class="rounded-full overflow-hidden mr-2">
                    <img class="w-8 h-8" src="{post.authorImage[index]}" alt="Author Profile" />
                  </div>
                {/if}
                <div>{name}</div>
              </div>
            {/each}
          {:else}
            <div class="Posts-Author | { postsSettings?.post?.author?.class || 'mt-1 mb-4 flex items-center'}">
              {#if post.authorImage?.[0] }
                <div class="rounded-full overflow-hidden mr-2">
                  <img class="w-8 h-8" src="{post.authorImage?.[0]}" alt="Author Profile" />
                </div>
              {/if}
              {#if post.author && post.author !== 'undefined' }
                <div>{post.author}</div>
              {/if}
            </div>
          {/if}
        {/if} 

        {#if post.categories }
          <div class="Category-container | { postsSettings?.post?.category?.container?.class || 'mt-2'}">
            {#if Array.isArray(post.categories) && post.categories.length > 0}
              {#each post.categories as cat}
                <span class="Category { postsSettings?.post?.category?.class || 'text-xs py-1 px-2 text-gray-800 bg-gray-100 border-gray-100 | mr-2'} ">{cat}</span>
              {/each}
            {:else}
              <span class="Category { postsSettings?.post?.category?.class || 'text-xs py-1 px-2 text-gray-800 bg-gray-100 border-gray-100 | mr-2'}">{post.categories}</span>
            {/if}
          </div>
        {/if}

      </div>
    {/each}
  </div>
{/if}
