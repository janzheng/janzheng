import Vue from 'vue'
import VueSegmentAnalytics from 'vue-segment-analytics'



export default ({env, router}, inject) => {

  const initSegment = function() {
    // docs: https://github.com/segmentio/analytics-vue
    Vue.use(VueSegmentAnalytics, {
      id: env.site_segment,
      // router // Optional`
    })

    console.log('[Using Segment]')
    inject('segment', VueSegmentAnalytics)
  }

  inject('initSegment', initSegment)
}
