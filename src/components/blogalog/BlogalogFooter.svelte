<!-- 

  this will probably become a swappable footer, e.g. for unpaid members

 -->
<script>
  import Notion from "@components/sveltekit-notion/src/Notion.svelte";
  import SocialBox from './subcomponents/Socialbox.svelte';

  import { parseYaml, generatePageStyles, getPageBlocks } from './utils/index.js'
  
  import MarkdownIt from 'markdown-it';
  import markdownItAttrs from 'markdown-it-attrs';
  const md = new MarkdownIt({ breaks: true, html: true });
  md.use(markdownItAttrs);

  export let blogalogData, classes = "mt-8"

  export let pageType = 'profile'; // profile, component, post

  // Footer data comes from the top-level footer object in new schema
  let settings = blogalogData?.settings
  let footerData = {
    email: blogalogData?.meta?.email,
    socialLinks: blogalogData?.meta?.socialLinks,
    content: blogalogData?.footer?.content,
    pageBlocks: getPageBlocks(blogalogData?.footer?.pageBlocks, blogalogData),
    settings: settings,
    styleString: settings?.page && generatePageStyles(settings?.page, {type: 'string'}),
  }



  export let clientHeight;
</script>


<!-- extract this into its own reusable component -->

<span id="blogalog-footer" class="row-anchor _footer footer {blogalogData?.settings?.anchor?.class}"></span>
<footer bind:clientHeight={clientHeight} 
  class="Component-Footer | Blogalog-Container | {classes} {footerData.settings?.footer?.container?.wrapper?.class || ''} "
  style={footerData.styleString + "; " + footerData.settings?.footer?.container?.style}
  >
  <div class="Component-Footer-Main
    { 
      (pageType=='profile' && (footerData.settings?.footer?.container?.class || 'content-notion-wide | py-4')) ||
      (pageType=='component' && (footerData.settings?.footer?.container?.component?.class || 'content-post-width | py-4')) ||
      (pageType=='post' && (footerData.settings?.footer?.container?.post?.class || 'content-post-width | py-4'))
    }
    {footerData.settings?.footer?.container?.sideBySide && 'footer-sidebyside notion-row-columnflex notion-sturdy-columnheaders' || ''} 
    "
  >

    <!-- this is usually on the LEFT side of the Content Blocks / massive links list -->
    <!-- this is normally flush to the block containers; on xs, add padding to align to text -->
    <div class="Component-Footer-Content-Container | {footerData.settings?.footer?.contentContainer?.class || 'pfix pl-2 md:pl-0 text-center'} ">
      {#if footerData.content}
        <div class="Component-Footer-Content | {footerData.settings?.footer?.content?.class||'my-4'}">
          <!-- {@html marked(content)} -->
          {@html md.render(footerData.content||'')}
        </div>
      {/if}

      {#if footerData.socialLinks}
        <div class="Component-Footer-Social | {footerData.settings?.footer?.social?.class||'text-2xl | mt-6 mb-12'} ">
          <SocialBox classes="flex gap-1 items-center justify-center" email={footerData.email} socialText={footerData.socialLinks} />
        </div>
      {/if}
    </div>

    <!-- usually rendered as a massive links list -->
    {#if footerData.pageBlocks }
      <div class="Component-Footer-Blocks  {footerData.settings?.footer?.blocks?.class||''}">
        <Notion blocks={footerData.pageBlocks} />
      </div>
    {/if}
  </div>

  {#if footerData.settings?.footer?.bottom}
    <div class="Component-Footer-Bottom | {footerData.settings?.footer?.bottom?.container?.class||'content-notion-wide | p-4 | flex flex-row gap-2'}">
      <div class="Component-Footer-Bottom-Left {footerData.settings?.footer?.bottom?.left?.class||'grow'}">
        {@html md.render(footerData.settings?.footer?.bottom?.left?.markdown||'')}
      </div>
      <div class="Component-Footer-Bottom-Right {footerData.settings?.footer?.bottom?.right?.class||'self-end'}">
        {@html md.render(footerData.settings?.footer?.bottom?.right?.markdown||'')}
      </div>
    </div>
  {/if}
</footer>


<style lang="scss">

  .footer-sidebyside {
    // apply to Component-Footer
    @apply md:flex gap-24;

    .Component-Footer-Content-Container {
      @apply grow;
    }
    .Component-Footer-Blocks {
      // @apply flex-1;
      @apply mt-8 md:mt-0;
    }
    .notion {
      .notion-column {
        @apply pt-0;
      }
      p {
        @apply pb-3;
      }
      .notion-link {
        a {
          @apply subpixel-antialiased;
        }
        // @apply break-words;
        // word-break: normal;
      }
    }
  }

</style>
