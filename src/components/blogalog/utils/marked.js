

/* 

  Strip Markdown

  https://dustinpfister.github.io/2017/11/19/nodejs-marked/ 

*/

import { marked } from 'marked'

export const htmlEscapeToText = function (text) {
  return text.replace(/\&\#[0-9]*;|&amp;/g, function (escapeCode) {
    if (escapeCode.match(/amp/)) {
      return '&';
    }
    return String.fromCharCode(escapeCode.match(/[0-9]+/));
  });

}

// return a custom renderer for marked.
/* 
  usage:

  {marked(someMarkdown || '', {renderer: plainRenderer()})}

*/
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
