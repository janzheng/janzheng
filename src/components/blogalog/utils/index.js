
// returns optionally mapped pageBlocks, if you have blogalogdata.blockArray for data saving
export function getPageBlocks(blocks, blogalogData) {
  if (!blocks) return null;
  if (!Array.isArray(blocks)) return blocks;

  return blocks.map(blockId => {
    if (typeof blockId === 'string') {
      return blogalogData?.blockArray?.find(block => block.id === blockId);
    }
    return blockId;
  });
}



export function buildPageOrder({ sitePages, pageOrder = [], sections = [] } = {}) {
  // build the sections list
  sitePages?.forEach(page => {
    if (page?.type) {
      const section = page.section;
      if (section && section.length > 0 && section !== ' ') {
        const sectionExists = sections.find(s => s.section === section);
        if (sectionExists) {
          sectionExists.pages.push(page);
        } else {
          const newSection = { section: section, sectionDescription: page.sectionDescription, pages: [page] };
          sections.push(newSection);
        }
      }
    }
  });
  // build the pageOrder list
  sitePages?.forEach(page => {
    pageOrder.push(page);
    if (page.section && !pageOrder.find(pageOrderPage => pageOrderPage.group === page.section)) {
      const section = sections.find(s => s.section === page.section);
      if (section) {
        const newObject = { name: section.section, group: section.section, type: ['Group'], pages: section.pages, sectionDescription: section.sectionDescription };
        pageOrder.push(newObject);
      }
    }
  });
  pageOrder = pageOrder.filter(item => (!item.section || item.section == ' '));
  return pageOrder
} 




export function getNotionImageLink(notionImage) {
  // New schema: cover/files are pre-resolved URL strings
  if (!notionImage) return null
  // If it's a page object with pre-resolved cover URL
  if (notionImage?.cover) return notionImage.cover;
  if (notionImage?.files?.[0]) return notionImage.files[0];
  // Fallback for raw string URLs
  if (typeof notionImage === 'string' && notionImage.includes("http")) return notionImage;
  return null
}




import YAML from 'yaml';
export const parseYaml = (yaml, trace) => {
  try {
    return YAML.parse(yaml)
  } catch (e) {
    console.error('YAML Parse error:', e, '\Trace:', trace)
  }
}



export function generatePageStyles(settingsPage, settings = {}) {
  if (!settingsPage) return null

  const acceptedKeys = [
    '--blogalog-page-width',
    '--blogalog-page-width',
    '--blogalog-post-width',
    '--blogalog-page-custom-width',
    '--color-base',
    '--color-title',
    '--color-link',
    '--color-link-hover',
    '--color-title-link',
    '--color-title-hover',
    '--color-bg',
    '--color-primary',
    '--color-primary-hover',
    '--color-primary-white',
    '--color-primary-active',
    '--color-primary-active-hover',
    '--color-primary-light',
    '--color-primary-dark',
    '--color-primary-ring',
    '--color-primary-ring-active',
    '--color-primary-text',
    '--color-primary-text-hover',
    '--link-hover-decoration',
    '--link-hover-decoration-thickness',
    '--slideup-distance',
    '--slideup-duration',
    '--font-title',
    '--input-border-color',
    '--input-focus-border-color',
    '--input-bg-color',
    '--input-hover-border-color'
  ];

  const pageStyles = acceptedKeys.reduce((acc, key) => {
    if (settingsPage[key.slice(2)]) {
      acc[key] = settingsPage[key.slice(2)];
    }
    return acc;
  }, {});

  if (settings.type == 'string') {
    // string for style={"..."}
    return Object.entries(pageStyles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  // object for document.documentElement.style.setProperty
  return pageStyles;

}

// NOTE: a duplicate plainRenderer() that referenced marked v4's
// `marked.Renderer()` API lived here. Removed 2026-04-23 during the
// marked → markdown-it migration. Only two orphan files used it
// (ComponentPage.svelte, PageGroup.svelte) and they've been deleted.
// If you need markdown-stripped plaintext, use `plainText()` from
// ./markdownit.js instead.
