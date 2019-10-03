<template>
  <div class="Home">

    <div class="Home-intro _section-page _padding-top-2 _padding-bottom">
      <div class="_section-article _divider-bottom" v-html="$md.render(intro || '')" />

      <div class="_section-article _divider-top " v-html="$md.render(first || '')" />
    </div>

    <Project v-for="item of main_projects" :key="item.id" :project="item" class=" _margin-bottom" />

    <div class="Home-projects _section-page _divider-top _divider-bottom">
      <div class="_section-article _divider-top _divider-bottom" v-html="$md.render(second || '')" />
    </div>

    <Project v-for="item of client_projects" :key="item.id" :project="item" class=" _margin-bottom" />

  </div>
</template>




<script>


import { mapState } from 'vuex'
import Project from '~/components/Project.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm,
    Project,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content']
  },

  data () {
    return {
      intro: this.$cytosis.findOne('home-intro', this.$store.state['Content'] ).fields['Markdown'],
      first: this.$cytosis.findOne('home-first', this.$store.state['Content'] ).fields['Markdown'],
      second: this.$cytosis.findOne('home-second', this.$store.state['Content'] ).fields['Markdown'],
      // content: this.$cytosis.findOne('home', this.$store.state['Content'] ).fields['Markdown'],
      // form: this.$cytosis.findOne('form-signup', this.$store.state['Content'] ),
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      ]),

    main_projects() {
      return this['Content'].filter(t => t.fields['Type'] == 'Main Project')
    },

    side_projects() {
      return this['Content'].filter(t => t.fields['Type'] == 'Side Project')
    },

    client_projects() {
      return this['Content'].filter(t => t.fields['Type'] == 'Client Project')
    },
  },

  async asyncData({env}) {

    return {
      postUrl: env.ext_handler,
    }
  },

  mounted() {
  },

  methods: {
  },



}
</script>

<style>
  .logo {
    max-width: 200px;
  }
</style>

