
import Vue from 'vue' 
import Scrollspy, { Easing } from 'vue2-scrollspy' 

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('scrollspy', Scrollspy)
}

Vue.use(Scrollspy, { easing: Easing.Cubic.InOut })
