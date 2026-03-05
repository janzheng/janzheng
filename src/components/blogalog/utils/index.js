
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
    if (page?.Type) {
      const Section = page.Section;
      if (Section && Section.length > 0 && Section !== ' ') {
        // console.log('Section -->', `[${Section}]`)
        const sectionExists = sections.find(section => section.Section === Section);
        if (sectionExists) {
          sectionExists.pages.push(page);
        } else {
          const newSection = { Section: Section, SectionDescription: page.SectionDescription, pages: [page] };
          sections.push(newSection);
        }
      }
    }
  });
  // build the pageOrder list
  sitePages?.forEach(page => {
    pageOrder.push(page);
    if (page.Section && !pageOrder.find(pageOrderPage => pageOrderPage.Group === page.Section)) {
      const section = sections.find(section => section.Section === page.Section);
      if (section) {
        const newObject = { Name: section.Section, Group: section.Section, Type: ['Group'], Pages: section.pages, SectionDescription: section.SectionDescription };
        pageOrder.push(newObject);
      }
    }
  });
  pageOrder = pageOrder.filter(item => (!item.Section || item.Section == ' '));
  // console.log('pageOrder 1:', pageOrder, 'sections:', sections);
  return pageOrder
} 




export function getNotionImageLink(notionImage) {
  /* 
    we want rawUrl whenever possible, EXCEPT when it contains "https://prod-files-secure.s3" which doesn't render properly
  */
  if (!notionImage) return null

  let fileObj = notionImage?.Files?.[0] || notionImage?.[0] || notionImage
  let url // = notionImage?.Content // defunct; images should be in .Cover or other explicit URL fields! Many items use .Content for text

  // console.log('fileObj:',fileObj)
  const links = ["https://prod-files-secure.s3", "//s3-us-west-2.amazonaws"];
  if (!url) url = links.some(link => fileObj?.rawUrl?.includes(link)) ? fileObj?.url : fileObj?.rawUrl;
  // console.log('url1:',url)
  if (!url) url = fileObj?.url
  // console.log('url2:',url)
  if (!url) url = notionImage?.Cover
  if (!url && notionImage.includes && notionImage.includes("http")) url = notionImage

  return url
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




import { marked } from 'marked'
export const plainRenderer = function () {
  var renderer = new marked.Renderer();
  // render just the text of a link
  renderer.link = function (href, title, text) {
    return text;
  };

  // render just the text of a paragraph
  renderer.paragraph = function (text) {
    return htmlEscapeToText(text) + '\r\n';
  };

  // render just the text of a heading element, but indecate level
  renderer.heading = function (text, level) {
    // return level + ' ) ' + text;
    return text;
  };

  // render nothing for images
  renderer.image = function (href, title, text) {
    return '';
  };

  return renderer;
}
