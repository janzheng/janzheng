
// temp fix for @nuxtjs/markdownit
// injects into $md.render

import MarkdownIt from 'markdown-it'

import MarkdownItAttrs from 'markdown-it-attrs'
// import MarkdownItSup from 'markdown-it-sup'
// import MarkdownItFootnote from 'markdown-it-footnote'
// import LinkifyIt from 'linkify-it'
// import MarkdownItDeflist from 'markdown-it-deflist'
// import MarkdownItMark from 'markdown-it-mark'

// import sanitize from 'sanitize-html'

// this one's great but MASSIVE
// import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

// let MarkdownIt = require('markdown-it')
// let MarkdownItAttrs = require.resolve('markdown-it-attrs') // loaded thru webpack
// let MarkdownItAttrs = require('markdown-it-attrs') // loaded thru webpack



export let md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
})
md.use(MarkdownItAttrs)
// md.use(MarkdownItSup)
// md.use(MarkdownItFootnote)
// md.use(LinkifyIt) // really good at detecting links
// md.use(MarkdownItDeflist) // http://johnmacfarlane.net/pandoc/README.html#definition-lists
// md.use(MarkdownItMark) // == this text is marked == this text is not

// md.use(markdownItTocAndAnchor, {
//   anchorLink: false,
// })

md.linkify.tlds('directory', true) // add phage.directory tld for fuzzy emails

// add mentions handler
md.linkify.add('@', {
  validate: function (text, pos, self) {
    var tail = text.slice(pos);

    if (!self.re.twitter) {
      self.re.twitter = new RegExp(
        '^([a-zA-Z0-9_-]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
      );
    }
    if (self.re.twitter.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '@') {
        return false;
      }
      return tail.match(self.re.twitter)[0].length;
    }
    return 0;
  },
  normalize: function (match) {
    match.url = 'https://phage.directory/m/' + match.url.replace(/^@/, '');
  }
});


// md['removeHTML'] = function strip(html) {
//   let clean = sanitize(html, {
//     allowedTags: [], // allow nothing
//     // allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
//     // allowedAttributes: {
//     //   'a': [ 'href' ]
//     // },
//   })
//   // console.log('clean html:', clean)

//   return clean
// }


// md['removeLinks'] = function strip(html) {
//   let clean = sanitize(html, {
//     allowedTags: ['p', 'div', 'b', 'i', 'em', 'strong', 'ul', 'li'], // allow nothing
//     // allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
//     // allowedAttributes: {
//     //   'a': [ 'href' ]
//     // },
//   })
//   // console.log('clean html:', clean)

//   return clean
// }

// md['unwrap'] = function strip(html) {
//   let clean = sanitize(html, {
//     allowedTags: ['b', 'i', 'em', 'strong', 'ul', 'li'], // allow nothing
//     // allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
//     // allowedAttributes: {
//     //   'a': [ 'href' ]
//     // },
//   })
//   // console.log('clean html:', clean)

//   return clean
// }

md['singular'] = function (text) {
  // turn text into singular by removing the at the end
  // of course won't work for everything, but for "Jobs" and "Posts"
  if (text.substring(text.length - 1) === 's')
    return text.substring(0, text.length - 1)

  return text
}

md['strip'] = function (md, start = '<p>', end = "</p>") {
  // add functionality to strip the annoying <p></p> from a rendered markdown
  // really useful for rendering markdown content in to an H1, etc.
  // usage: $md.strip($md.render( post.fields['Title'] || ''))
  // return md.substring(3, md.length-5)
  // added a fix; end.length + 1 seems to better cut off the </p>; might break other implementations
  return md.substring(start.length, md.length - (end.length + 1))
}



// wraps the render function and adds pd functionality
md['_render'] = (md) => {
  let render = md.render(md)
  console.log('md._render', render)

  return render
}