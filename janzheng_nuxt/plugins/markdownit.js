
// temp fix for @nuxtjs/markdownit
// injects into $md.render

import MarkdownIt from 'markdown-it'

import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItFootnote from 'markdown-it-footnote'
// import LinkifyIt from 'linkify-it'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItMark from 'markdown-it-mark'

// this one's great but MASSIVE
// import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

// let MarkdownIt = require('markdown-it')
// let MarkdownItAttrs = require.resolve('markdown-it-attrs') // loaded thru webpack
// let MarkdownItAttrs = require('markdown-it-attrs') // loaded thru webpack



// export default ({ app }, inject) => {
export default ({ }, inject) => {
  let md = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
    breaks: true,
  })
  md.use(MarkdownItAttrs)
  md.use(MarkdownItSup)
  md.use(MarkdownItFootnote)
  // md.use(LinkifyIt) // really good at detecting links
  md.use(MarkdownItDeflist) // http://johnmacfarlane.net/pandoc/README.html#definition-lists
  md.use(MarkdownItMark) // == this text is marked == this text is not

  // md.use(markdownItTocAndAnchor, {
  //   anchorLink: false,
  // })

  md['strip'] = function (md) {
    // add functionality to strip the annoying <p></p> from a rendered markdown
    // really useful for rendering markdown content in to an H1, etc.
    // usage: $md.strip($md.render( post.fields['Title'] || ''))
    return md.substring(3, md.length-5)
  }

  inject('md', md)


}



