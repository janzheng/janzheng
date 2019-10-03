
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

Vue.filter('niceDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('MMMM D, YYYY')
  }
})

Vue.filter('niceTimeDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('h:mm a, MMM D')
  }
})

Vue.filter('dateTo', function(value) {
  if (value) {
    // return dayjs(String(value)).format('MMMM D, YYYY')
    return dayjs().to(dayjs(String(value)))
  }
})


Vue.filter('dateDiffMinutes', function(value) {
  if (value) {
    // return dayjs(String(value)).format('MMMM D, YYYY')
    return dayjs().to(dayjs(String(value)))
  }
})

Vue.filter('isBefore', function(value) {
  if (value) {
    return dayjs().isBefore(dayjs(String(value))) // is today before the value?
  }
})



// export default ({ app }, inject) => {
export default ({ }, inject) => {
  inject('dayjs', dayjs)
}


