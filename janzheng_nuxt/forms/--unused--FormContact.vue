<template>
  <div class="FormContact FormCard">

    <Form :payload="payload"
          :send-email="true"
          :validate="false"
          class=""
          target="_dynamic"
          source="Contact page / contact form"
    />
  </div>
</template>

<script>

import Form from '~/components/layout/Form.vue'
import { mapState } from 'vuex'

export default {

  components: {
    Form,
  },

  props: {
    src: Object,
  },

  data: function () {
    
    return {
    }
  },

  computed: {
    ...mapState([
      'Content',
      ]),

    payload() {
      return {
        intro: this.src.fields['Markdown'],
        JSON: this.src.fields['JSON'],
        isPublished: this.src.fields['isPublished'],
    
        handler: this.src.fields['String'] || this.$store.state.ext_handler,
        error: this.$cytosis.findOne('form-error', this.$store.state['Content'] ).fields['Markdown'],
        thanks: this.$cytosis.findOne('form-thanks', this.$store.state['Content'] ).fields['Markdown'],
        cta: this.$cytosis.findOne('form-cta', this.$store.state['Content'] ).fields['Markdown'],
        privacy: this.$cytosis.findOne('form-privacy', this.$store.state['Content'] ).fields['Markdown'],
      }
    }
  },


  methods: {
    // rawContent(findStr) {
    //   return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    // },
    // content(findStr) {
    //   return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },

  }

}
</script>

<style lang="scss" scoped></style>

