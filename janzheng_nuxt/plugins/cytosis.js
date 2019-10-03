
// 
// Used to inject $cytosis into nuxt, for use w/ the static methods
// 

import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('cytosis', Cytosis)
}
