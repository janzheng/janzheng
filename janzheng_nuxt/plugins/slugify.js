
import Vue from 'vue'
import slugify from 'slugify'

Vue.filter('slugify', function(value) {
  if (value) {
    return slugify(value, {
      lower: true,
    })
  }
})

// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('slugify', slugify)
}

