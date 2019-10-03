

<template>
  <div v-if="!$policy.isLatest()" class="PolicyBanner _grid-1-auto-xs _align-vertically">

    <div class="">
      <!-- We use cookies for site analytics and customer service, but we don’t track your personal data.  -->
      We use cookies to improve our site, and to understand where people are visiting from. We don’t use targeted ads or track personal information.

      Read our <nuxt-link to="/policies">site policies here</nuxt-link>.
    </div>

    <div class="_right">
      <div class="PolicyBanner-btn _button --short _margin-none" @click="acceptPolicy" >
        I accept
      </div>
    </div>
    
  </div>
</template>


<script>


// import Vue from 'vue'
// import { mapState } from 'vuex'

export default {

  data: function () {
    return {
    }
  },

  computed: {
    // isLatestPolicy() {
    //   if(this.$store.state.policy == this.$store.state.latestPolicy) {
    //     return this.$store.state.policy
    //   }
    //   return false
    // }
  },
  
  mounted: function () {
  },

  methods: {
    acceptPolicy: function() {
      this.$policy.updateToLatestPolicy()
      this.$policy.enablePolicyFeatures()
      
      // console.log('enable ga (policy.js)', Vue.$ga)
      // Vue.$ga.enable()
    }
  },

}
</script>



<style lang="scss" scoped>

</style>


