import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

Vue.component('vue-scrollto', VueScrollTo)

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('scrollTo', VueScrollTo)
}

