process.env.DEBUG = 'nuxt:*'
// process.env.NUXT_ENV_DEVALUE_LOG_LIMIT = -1
process.env.NUXT_ENV_DEVALUE_LOG_LEVEL = 'silent' // default is 'warn'


/*

  Forked from PDv3 6/10/2019

*/

import Cytosis from 'cytosis'

// const pkg = require('./package')

// note: nuxt requires Node 8+ to run properly 
// these are the default social sharing items
// make sure to use the Head component for generated data
const site_policy = '1.0.0' 

const site_ga = 'UA-39843414-2';
const site_segment = '';
const site_url = 'https://janzheng.com';
const site_name = 'Jan Z — product design & code & biz & 🎉';
const site_title = 'Jan Z — product design & code & biz & 🎉';
const site_twitter = '@yawnxyz';
const site_twitter_creator = '@yawnxyz';
const site_color = '#971f1f';
const site_description = 'Sup, I’m Jan, a product designer who combines code and lean startup methods to solve really hard problems in the world.';

// const site_ico = '/ico_dull.png';
const site_ico = '';
const site_image = '/share_img_2.png';
const site_search = 'index,follow';
const site_author = 'Jan Zheng';
const page_name = ''; // placeholder for the copy+paste

const site_fb = '409001986635448'; // phage directory fb id

const airtable_api = 'keyAe6M1KoPfg25aO'; // cytosisreader@zeee.co handler
const airtable_base = 'appdhZvWtrq7Bn7s0'; // Quicktrip Airtable Repo

const analyze = false; // analyzer (webpack; turn off for prod)
const offline = false;
let mode = 'universal' 
// 'spa' loads airtable dynamically
// 'static' only generates once / use npm run generate
// const mode = 'universal' // loads airtable during build-time only (any changes to airtable won't be reflected live)
if (process.env.NODE_ENV == 'spa') {
  console.log('RUNNING IN SPA MODE')
  mode = 'spa'
}

const site_static = false; // if set to true, the client will never pull data 

let site_routes; // used for the generate process to save on airtable pulls

// export default (async function() {
export default {
  // let site_data
  // if (mode == 'universal') 
  //   site_data = await initData()

  // console.log('site_data:', site_data)

  // let obj = {
  // export default {
  // mode: 'universal', // use this for deployment; need to rebuild the site every time airtable content changes
  mode: mode, // for development, or for real-time airtable changes
  env: {
    mode: mode,
    site_fb: site_fb,
    airtable_api: airtable_api,  
    airtable_base: airtable_base,

    site_policy: site_policy,
    site_segment: site_segment,
    ext_handler: '',
    // site_data: site_data,
    site_static: site_static,
  },

  server: {
    port: 4321, // default: 3000
    // host: '0.0.0.0', // default: localhost
  },

  render: {
    // https://nuxtjs.org/api/configuration-render#resourcehints
    // disable prefetch of all the pages; saves bg download data
    // resourceHints: false,

    // Content-Security-Policy
    // https://nuxtjs.org/api/configuration-render#csp
    // csp: {
    //   hashAlgorithm: 'sha256',
    //   allowedSources: undefined,
    //   policies: undefined
    // }
  },


  /*
      Headers of the page
      'hid' is a 'head identifier' and used as a unique key
  */
  head: {
    title: site_title,
    meta: [

      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }, // max-scale prevents auto-zoom on mobile, may prevent zoom
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { hid: 'description', name: 'description', content: site_description },
      { hid: 'theme-color', name: 'theme-color', content: site_color },

      { hid: 'search-google', name: 'robots', content: site_search },
      { hid: 'search-robots', name: 'googlebot', content: site_search },
      // { hid: 'nositelinkssearchbox', name: 'google', content: 'nositelinkssearchbox' },
      // { hid: 'notranslate', name: 'google', content: 'notranslate' },

      // Page-Specific

      // Facebook
      // <meta property="fb:app_id" content="123456789">
      { hid: 'fb-app_id', property: 'fb:app_id', content: site_fb },
      // <meta property="og:url" content="http://example.com/page.html">
      { hid: 'og-url', property: 'og:url', content: site_url + '/' + page_name },
      // <meta property="og:type" content="website">
      { hid: 'og-type', property: 'og:type', content: 'website' },
      // <meta property="og:title" content="Content Title">
      { hid: 'og-title', property: 'og:title', content: site_title },
      // <meta property="og:image" content="http://example.com/image.jpg"> 
      // FB & Twitter work best with: 1200 X 675 
      { hid: 'og-image', property: 'og:image', content: site_url + site_image },
      // <meta property="og:description" content="Description Here">
      { hid: 'og-description', property: 'og:description', content: site_description },
      // <meta property="og:site_name" content="Site Name">
      { hid: 'og-site_name', property: 'og:site_name', content: site_name },
      // <meta property="og:locale" content="en_US">
      { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
      // <meta property="article:author" content="">
      { hid: 'article-author', property: 'article:author', content: site_author },

      // Twitter Card
      // <meta name="twitter:card" content="summary"> > summary or summary_large_image
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      // <meta name="twitter:site" content="@site_account">
      { hid: 'twitter-site', property: 'twitter:site', content: site_twitter },
      // <meta name="twitter:creator" content="@individual_account">
      { hid: 'twitter-creator', property: 'twitter:creator', content: site_twitter_creator },
      // <meta name="twitter:url" content="http://example.com/page.html">
      { hid: 'twitter-url', property: 'twitter:url', content: site_url + '/' + page_name },
      // <meta name="twitter:title" content="Content Title">
      { hid: 'twitter-title', property: 'twitter:title', content: site_title },
      // <meta name="twitter:description" content="Content description less than 200 characters">
      { hid: 'twitter-description', property: 'twitter:description', content: site_description },
      // <meta name="twitter:image" content="http://example.com/image.jpg">
      { hid: 'twitter-image', property: 'twitter:image', content: site_url + site_image },

    ],
    link: [

      // <!-- Helps prevent duplicate content issues -->
      // <link rel="canonical" href="http://example.com/">
      { hid: 'canonical', rel: 'canonical', href: site_url+'/' },

      { rel: 'icon', type: 'image/png', href: site_ico }, // <link rel="icon" sizes="192x192" href="/path/to/icon.png">
      { rel: 'apple-touch-icon', href: site_ico }, // default resolution is 192x192 <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png">
      { rel: 'mask-icon',  href: site_ico, color: site_color}, // <link rel="mask-icon" href="/path/to/icon.svg" color="blue"> <!-- Safari Pinned Tab Icon -->
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Work+Sans:400,600,700' }
    ],
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: site_color },

  /*
  ** Build configuration
  */

  plugins: [
    // '~plugins/filters.js',nuxtjs/google-tag-manager
    // { src: '~/plugins/plugintest.js', ssr: false }
    // { src: '~/plugins/hotjar.js', ssr: false }, // need to link this to policy
    // { src: '~/plugins/mixpanel.js', ssr: false },
    // { src: '~/plugins/lazyload.js', ssr: false },
    // { src: '~/plugins/pictureswipe.js', ssr: false },
    // { src: '~/plugins/paypal.js', ssr: false },
    // { src: '~/plugins/disqus.js', ssr: false },
    // { src: '~/plugins/twitter.js', ssr: false }, // very heavy
    { src: '~/plugins/markdownit.js' },
    { src: '~/plugins/cytosis.js' },
    { src: '~/plugins/date.js' },
    { src: '~/plugins/headmatter.js' },
    { src: '~/plugins/slugify.js' },
    { src: '~plugins/vue-scrollto.js' },
    // https://github.com/Developmint/nuxt-purgecss
    // { src: '~/plugins/dynamicData.js' } // done as middleware instead

    { src: '~/plugins/drift.js', mode: 'client' }, // ssr: false is deprecated
    { src: '~/plugins/scrollspy.js', mode: 'client' },
    { src: '~/plugins/segment.js', mode: 'client' },

    // needs to be loaded last (after all the other analytics etc.)
    { src: '~/plugins/policy.js', mode: 'client' },
  ],

  modules: [
    // '@nuxtjs/font-awesome',
    ['@nuxtjs/google-analytics', {
      id: site_ga,
      // disabled: true // gdpr, policy.js enables it: https://medium.com/dailyjs/google-analytics-gdpr-and-vuejs-e1bd6affd2b4
    }],
    // ['@nuxtjs/google-tag-manager', { 
    //   id: 'GTM-WCR3X43' 
    // }],
    ['@nuxtjs/pwa'],
    ['nuxt-leaflet', { /* module options */ }],

    // segment handles all analytics — use the plugin instead!!
    // ['nuxt-segment-analytics', { id: site_segment, useRouter: true }],
    // 'nuxt-purgecss', // purges markdown-based css... womp
  ],

  manifest: {
    name: 'coeurnuxtsurge',
    short_name: 'coeurnuxtsurge',
    display: 'standalone',
    start_url: 'https://coeurnuxtsurge.com/',
    theme_color: site_color,
    background_color: '#FFFFFF',
    lang: 'en',
    // icons: PWAIcons
  },

  workbox: {
    globPatterns: ['**/*.{js,css}', '**/img/*'],
    offlinePage: '/404.html',
    generate: {
      fallback: true
    },
    // this breaks SPA mode, and is super aggressive, but makes offline mode work really well
    // runtimeCaching: [
    //   {
    //     urlPattern: 'https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*',
    //     handler: 'cacheFirst',
    //     method: 'GET',
    //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
    //   },
    //   // {
    //   //     urlPattern: 'https://fonts.googleapis.com/.*',
    //   //     handler: 'cacheFirst',
    //   //     method: 'GET',
    //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
    //   // },
    //   // {
    //   //     urlPattern: 'https://fonts.gstatic.com/.*',
    //   //     handler: 'cacheFirst',
    //   //     method: 'GET',
    //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
    //   // },
    // ]
  },

  build: {
    // helps cache busting
    // filenames: {
    //   app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
    //   // chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
    //   css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css'
    // },

    // https://willbrowning.me/reducing-the-vendor-bundle-size-in-nuxt-js/
    analyze: analyze, // use --analyze instead for visualizer
    minimize: true,
    // cache: true,
    extractCSS: true, // moves css out to its own file in gen
    optimizeCSS: true,

    // splitChunks: {
    //   layouts: true
    // },

    babel: {
      sourceType: "unambiguous",
      presets: [
        ['@babel/preset-env', {
          // debug: true,
          // useBuiltIns: 'usage',
          targets: {
            "browsers": ["> 1%", "ie >= 11", "not ie <= 8"]
            // "browsers": ["> 1%", "last 2 versions", "ie >= 11", "not ie <= 8"]
          }
        }]
      ],
      plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-typeof-symbol', '@babel/plugin-transform-runtime'],
    },
    // explicitly transpile these
    transpile: ['cytosis', 'vuex-cache', 'markdownit', 'markdown-it-attrs'],
    // transpile: ['cytosis', 'vuex-cache', 'markdownit'],

    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },


  css: [
    // coeur style guide
    // '@/assets/css/settings.scss',
    // '@/node_modules/coeur/styles/index.scss', // this imports EVERYTHING; is going to be huge; overrides 'settings'

    // main project styles
    '@/assets/css/main.scss'
  ],

  router: {
    // middleware: 'pageload', // middleware added on the template
    extendRoutes (routes, resolve) {
    },

  },
  generate: {
    interval: 500, // slow down api calls // https://nuxtjs.org/api/configuration-generate/
    // fallback: true, // true if you want to use '404.html' — for surge, use false if you want to use 200 spa fallback
    // concurrency: 1, // reduce server strain
    // routes: async function (callback) {

    //   const airKey = airtable_api
    //   const airBase = airtable_base

    //   //   // generate template routes
    //   console.log('[generator]: fetch pages/templates cytosis')
    //   let _cytosis = await new Cytosis({
    //     airKey, 
    //     airBase, 
    //     tableQuery: 'everything-published',
    //     caller: 'Generator',
    //   })

    //   let routeList = []

    //   //   // // build pages/templates
    //   //   for (let route of template_routes.tables['Content']) {
    //   //     if(route.fields['Slug'])
    //   //       routeList.push(`/${route.fields['Slug']}`
    //   //     )
    //   //   }

    //   // routes for C&T article pages
    //   let manuscripts = _cytosis.tables['Manuscripts'].sort((a,b) => new Date(b.fields['Data:Date']) - new Date(a.fields['Data:Date']))
    //   const latestManuscripts = manuscripts.slice(0,15)
    //   // const latestManuscripts = manuscripts // everything
    //   // console.log('latest Manu:', latestManuscripts.length)

    //   for (let item of latestManuscripts) {
    //     // console.log('manu loop', item.fields['Data:Date'], ' - ', item.fields['Slug'])
    //     if(item.fields['Slug'])
    //       routeList.push(`/capsid/${item.fields['Slug']}`)
    //   }
    //   // only process the last few to save time

    //   // build Jobs detail pages
    //   // for (let jobs of site_routes.tables['Jobs']) {
    //   //   if(jobs.fields['Slug'])
    //   //     routeList.push(`/jobs/${jobs.fields['Slug']}`)
    //   // }

    //   console.log('[generator] routes: ', routeList)
    //   callback(null, routeList)
    // }
  }

}

//   return obj
// })()



