<!-- 

  this will probably become a swappable footer, e.g. for unpaid members

 -->
<script>
  import Notion from "@components/sveltekit-notion/src/Notion.svelte";
  import SocialBox from './subcomponents/SocialBox.svelte';

  import { parseYaml, generatePageStyles } from './utils/index.js'
  
  import MarkdownIt from 'markdown-it';
  import markdownItAttrs from 'markdown-it-attrs';
  const md = new MarkdownIt({ breaks: true, html: true });
  md.use(markdownItAttrs);

  export let blogalogData, classes = "mt-8"

  export let pageType = 'profile'; // profile, component, post
  // let blogData = getContext('blogData');
  // let email = blogData?.blog?.['site-data']?.Email?.['Content'];
  // let socialLinks = blogData?.blog?.['site-data']?.SocialLinks?.['Content'];
  // let content = blogData?.blog?.['site-data']?.['Footer']?.Content;
  // let pageBlocks = blogData?.blog?.['site-data']?.['Footer']?.pageBlocks;

  // let settings = blogData?.settings
  // let pageStyles
  // if (blogData?.blog?.['site-data']?.['Footer']?.YAML) {
  //   settings = parseYaml(blogData?.blog?.['site-data']?.['Footer']?.YAML)
  //   // settings = YAML.parse(tmp)
  //   pageStyles = generatePageStyles(settings?.page, {type:'string'}) || null
  // }

  let settings = (blogalogData?.site?.footer?.YAML && parseYaml(blogalogData?.site?.Footer?.YAML)) || blogalogData?.settings
  let footerData = {
    email: blogalogData?.meta?.email,
    socialLinks: blogalogData?.meta?.socialLinks,
    content: blogalogData?.site?.Footer?.Content,
    pageBlocks: blogalogData?.site?.Footer?.pageBlocks,
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

<!-- 
{#if !footerData.settings?.footer?.hidePromo}
  <div class="Content-Blogalog | {footerData.settings?.footer?.promoClass||'text-sm py-4 text-center bg-slate-50' }">
    {#if footerData.settings?.footer?.promoText}
      {@html md.render(footerData.settings?.footer?.promoText || ``)}
    {:else}
      Get your own <a href="https://blogalog.net"> website</a> for your <a href="https://blogalog.net">blog, CV, research lab, or side project.</a>
      {#if footerData.settings?.footer?.showPhageDirectory}
        <br>A <a href="https://phage.directory">Phage Directory project.</a>
      {/if}
    {/if}
  </div>
{/if} -->






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
