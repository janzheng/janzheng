<template>
  <div class="Contact">

    <Context>
      <template #context>
        <NodeForm :src="form"/>
      </template>

      <div class="" v-html="$md.render(intro || '')" />
      <div class="" v-html="$md.render(content || '')" />
    </Context>

  </div>
</template>




<script>

import Context from '~/templates/context.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm,
    Context,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content"
  },

  data () {
    return {
      intro: this.$cytosis.findOne('contact-intro', this.$store.state['Content'] ).fields['Markdown'],
      content: this.$cytosis.findOne('contact-content', this.$store.state['Content'] ).fields['Markdown'],
      form: this.$cytosis.findOne('form-contact', this.$store.state['Content'] ),

      // content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
      // images: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
    }
  },
  
  computed: {

  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },
  
  mounted () {
  },

  methods: {
  },


}
</script>

<style>
</style>

