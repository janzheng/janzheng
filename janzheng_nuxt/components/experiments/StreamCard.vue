
<!-- 

 -->
<template>

  <div class="StreamCard _grid-1-6">
    <div class="StreamCard-sidebar" >
      <!-- <img class="cnt _block _left" src="/cnt.png" width="100px" alt="Capsid and Tail" /> -->
      <slot name="sidebar" />
    </div>
    <div class="StreamCard-main _margin-bottom" >
      <slot name="main" />
      <!-- <CapsidStub :issues="latest" :is-featured="true" class="_section-article _margin-center" /> -->
      <!-- <CapsidBanner /> -->
      <!-- <CapsidMicroBanner class="CapsidBanner" /> -->
      <!-- <FormCapsidFeedback class=""/> -->
    </div>
  </div>

</template>


<script>


export default {

  components: {
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // banner: this.$cytosis.find('Content.capsid-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

