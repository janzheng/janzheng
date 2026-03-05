
<script>
  import Notion from "@components/sveltekit-notion/src/Notion.svelte";
  
  // import { , getNotionImageLink, generatePageStyles } from '$lib/helpers.js'
  import { buildPageOrder, parseYaml } from './utils/index.js';
  import { componentTypes } from './utils/componentTypes.js';
  import { userData } from './utils/stores.js';
  import './styles/blogalog.scss';

  import Posts from './subcomponents/BlogalogPosts.svelte';

  export let blogalogData, classes;
  
  let pageOrder = buildPageOrder({sitePages: blogalogData.pages});

</script>



<div class="BlogalogRows | Blogalog-Container | {classes}">


  <!-- {#each sitePages as page} -->
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
        {#if row?.Type?.includes('Header')}
          <div id={'row-'+rowIndex} class="Profile-Row-Container | {settings?.row?.container?.class || 'mt-2 mb-0 content-notion-wide'} | overflow-hidden | " style={settings?.row?.container?.style||''}>
            <div class="Profile-Row--Header | {settings?.row?.class || ''} ">
              <div class="Profile-Row-Header-Title font-title {settings?.row?.headerClass || ' font-sans leading-tight text-lg mb-2 font-bold pt-0 mt-0'}">{row.Name}</div>
            </div>
          </div>
        {:else}
          <div class="Profile-Row-Container | {settings?.row?.container?.class || blogalogData?.styles?.profile?.defaultRowContainer}  | " style={settings?.row?.container?.style||''}>
            <!-- {page.Name} -->
            {#if row?.Type?.includes('Main')}
              {#if row?.Type.includes("Private") && !$userData['Email']}
                <!-- alternatively show an error message for Private pages when user isn't logged in -->
                <!-- <div class="text-red-500">This page is private. Please log in to view.</div> -->
              {:else if row?.Type.includes("Public") && $userData['Email']}
                <!-- hide public pages when user is logged in -->
              {:else}
                <div class="Profile-Row | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow} ">
                  {#if (!row?.Type.includes("#noheader") && !row.Attributes?.includes("noheader")) && row.Name !=='undefined'}
                    <!-- used to be h2 -->
                    <div class="Profile-Row--Header font-title {settings?.row?.header?.class || ' font-sans leading-tight text-2xl mb-2 font-bold pt-0 mt-0'}">{row.Name}</div>
                  {/if}
                  {#if row.Content}
                    <div class="Profile-Row--Content {settings?.row?.content?.class || ''}">
                      {@html md.render(row.Content || '')}
                    </div>
                  {/if}
                  {#if row.pageBlocks && row.pageBlocks.length > 0}
                    <div class="Profile-Row--Blocks {settings?.row?.blocks?.class || 'notion-collapse'}">
                      <Notion 
                        blocks={row.pageBlocks} 
                        settings={{
                          video: {
                            // turning all of these on turns a video into a gif
                            autoplay: true,
                            muted: true, // true: necessary for autoplay
                            playsinline: true, // for mobile so it doesn't full-screen
                            loop: true,
                          }
                        }} 
                      />
                    </div>
                  {/if}
                </div>
              {/if}

            {:else if row?.Type?.includes('Group')}
              {#if row?.Type.includes("Private") && !$userData['Email']}
                <!-- do nothing -->
              {:else if row?.Type.includes("Public") && $userData['Email']}
                <!-- do nothing -->
              {:else}
                <div class="Profile-Row--Group Profile-Row--Posts | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow + ' | my-2 overflow-hidden'} ">
                  {#if row.Pages.filter(page => page?.Type?.includes("Posts") && !page.Hide && page.Status !== "Draft").length > 0}
                    <div class="Profile-Row--Group-Header | {settings?.group?.header?.class || 'h5 pt-0 mt-0'}">{row.Group}</div>
                    {#if row.SectionDescription}<p class="{settings?.group?.description?.class || 'pb-8'} ">{row.SectionDescription}</p>{/if}
                    <div class="Profile-Row--Group-Container Profile-Row--Posts-Container">
                      <Posts posts={row.Pages.filter(page => page?.Type?.includes("Posts") && !page.Hide && page.Status !== "Draft")}></Posts>
                    </div>
                  {/if}
                </div>
              {/if}
            {:else if row?.Type?.includes('Posts')}
              {#if row?.Type.includes("Private") && !$userData['Email']}
                <!-- do nothing -->
              {:else if row?.Type.includes("Public") && $userData['Email']}
                <!-- do nothing -->
              {:else}
                <!-- loose posts are NOT grouped together unless given a section -->
                <div class="Profile-Row--Posts-Container | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow}">
                  <Posts posts={[row]} ></Posts>
                </div>
              {/if}
            <!-- {:else if page?.Type?.includes('Component') && page.Hide !== true} -->
            {:else if row?.Type?.some(type => componentTypes.includes(type)) && !row?.Hide }
              <div class="Profile-Row--Component-Container | {settings?.row?.class || blogalogData?.styles?.profile?.defaultRow}">
                <!-- <RenderComponent {row} {components} /> -->
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  {/each}


</div>

