
<!-- 

  Takes a node object from cytosis and turns it into a usable form object

 -->

<template>
  <div :class="src.fields['Data:Attrs']" class="Node-Form FormCard">
    <Form :payload="payload"
          :target-table="src.fields['Data:Select']"
          :send-email="true"
          :validate="true"
          :form-name="src.fields['Name']"
          class=""
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
    src: Object
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
      // console.log('payload src:', this.src)
      return {
        intro: this.src.fields['Markdown'],
        JSON: this.src.fields['Data:JSON'],
        isPublished: this.src.fields['isPublished'],
    
        handler:  this.src.fields['Data:URL'] || this.$store.state.ext_handler,
        error:    this.src.fields['Data:Error'] || this.$cytosis.findOne('form-default:error', this['Content'] ).fields['Markdown'],
        thanks:   this.src.fields['Data:Success'] || this.$cytosis.findOne('form-default:thanks', this['Content'] ).fields['Markdown'],
        cta:      this.src.fields['Data:String'] || this.$cytosis.findOne('form-default:cta', this['Content'] ).fields['Markdown'],
        privacy: this.$cytosis.findOne('form-default:privacy', this['Content'] ).fields['Markdown'],
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

