// import Vue from 'vue'

// Vue.mixin({
//   fetch(context) {
//     if(!process.server) {
//       const browserPolicy = localStorage.getItem('pd-policy')
//       console.log('mixin hook fetch', browserPolicy)
//     }
//   },
//   data() {
//     return {
//       my_global_config: 'This'
//     }
//   },
//   created: function () {
//     console.log('mixin hook created')
//   }
// })


// export default ({ app }, inject) => {
//   // Set `i18n` instance on `app`
//   // This way we can use it in middleware and pages `asyncData`/`fetch`
//   app.i18n = new VueI18n({
//     /* `VueI18n` options... */
//   })
// }

// export default function () {

//   console.log('hiya', window.onNuxtReady, )
//   if (process.BROWSER_BUILD) {
//     console.log(window)
//     console.log('onnuxtready defined', window.onNuxtReady)
//   }

// }

// window.onNuxtReady((context) => {
//   const browserPolicy = localStorage.getItem('pd-policy')
//   console.log('onNuxtReady', browserPolicy)
//   // console.log('Nuxt.js is ready and mounted', context.$store)
// })


// export default ({ app, env }, inject) => {

//   window.onNuxtReady(() => {
//     const browserPolicy = localStorage.getItem('pd-policy')
//     console.log('onNuxtReady', browserPolicy, env)
//     // console.log('Nuxt.js is ready and mounted', context.$store)
//   })
// }







