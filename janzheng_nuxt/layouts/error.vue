
<!-- error page / 404 etc. — keep this separate from any CMS. As basic as you can -->

<template>

  <!-- <ContentFrame class="About"> -->
  <div class="Error _section-page _margin-center">
    <div class="_section-content _margin-center">
      <h6>404 Error</h6>
      <h1 class="Error-title title">
        We apologize... we couldn’t find what you were looking for, or something went wrong.
      </h1>
      <h3>
        If you keep getting to this page but suspect you shouldn't be, please reach out to us by emailing <a href="mailto:hello@janzheng.com">hello@janzheng.com</a>. 
        <br><br>
        We really appreciate your help!
      </h3>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {

  components: {
  },

  layout: 'contentframe',
  // middleware: 'pageload',
  
  // fetch() {
  // },

  // async asyncData({app, env, route, store}) {
  //   // const cytosis = store.state.cytosis.tables
    
  //   // if(!store.state.cytosis.tables)
  //   //   return false

  //   return {
  //     // aboutTitle: app.$cytosis.find('Content.about-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
  //     // aboutBg: app.$cytosis.find('Content.about-bg', store.state.cytosis.tables)[0]['fields']['Markdown'],
  //     // aboutUs: app.$cytosis.find('Content.about-us', store.state.cytosis.tables)[0]['fields']['Markdown'],
  //     // jess: app.$cytosis.find('Content.about-jess', store.state.cytosis.tables)[0]['fields']['Markdown'],
  //     // jan: app.$cytosis.find('Content.about-jan', store.state.cytosis.tables)[0]['fields']['Markdown'],
  //   }
  // },

  // computed: {
  //   // ...mapState([
  //   //   'cytosis',
  //   //   // 'test'
  //   //   ]),
  // },

  // data: function () {
  //   // console.log('data:', this.$store.state)
  //   return {
  //     // content: this.$store.state.Content,
  //   }
  // },

  // mounted: function () {
  // },

  // methods: {
  // }

}
</script>

<style lang="scss" scoped>

</style>

