import Vue from 'vue'
import VuePictureSwipe from 'vue-picture-swipe'


Vue.use(VuePictureSwipe)
Vue.component('vue-picture-swipe', VuePictureSwipe)

// Vue.use(lazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })

// Vue.component('vue-lazyload', lazyload)


// // export default ({ app }, inject) => {
// export default ({ }, inject) => {
//   inject('lazyload', lazyload)
// }

