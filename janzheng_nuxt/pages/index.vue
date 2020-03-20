<template>
  <div class="Home">

    <div class="Home-intro _padding-top-2 _divider-bottom" >
      <div class="_section-page">
        <div class="_grid-2-1 _align-bottom _grid-gap-large-md" >
          <div class="Home-intro-txt _section-article " v-html="$md.render(intro || '')" />
          <div class="_center" >
            <img id="me" src="https://dl.airtable.com/.attachments/04e509743d71f5c3238d7bf1745adb01/f230816b/8.31supd_157_sq_sm_tiny.jpg" >
          </div>
        </div>
      </div>
    </div>




    <div class="_section-page _divider-top _padding-bottom">
      <div class="_section-page">
        <no-ssr>
          <div v-if="available" class="_section-article _divider-top _md-pfix" >
            <div class="_available _card _padding" v-html="$md.render(available || '')" />
          </div>
        </no-ssr>

        <Toggle class="_divider-top _cursor-help" >
          <template #off>
            <div class="_section-article " v-html="$md.render(self_short || '')" />
            <button class="_button --naked --short">Continue ➝ </button>
          </template>

          <template #on>
            <div class="_section-article " v-html="$md.render(self_long || '')" />
          </template>
        </Toggle>

        <div class="_section-article _divider-top _divider-botom" v-html="$md.render(now || '')" />
      </div>
    </div>



    <div class="_section-page">
      <Project v-for="item of main_projects" :key="item.id" :project="item" class=" _margin-bottom" />
    </div>

    <div class="Home-projects _section-page _divider-top _divider-bottom">
      <div class="_section-page">
        <div class="_section-article _divider-top _divider-bottom" v-html="$md.render(second || '')" />
      </div>
    </div>

    <div class="_section-page">
      <Project v-for="item of client_projects" :key="item.id" :project="item" class=" _margin-bottom" />
    </div>

    <div class="Home-third _section-page _divider-top _divider-bottom">
      <div class="_section-page">
        <div class="Home-brands _section-article _divider-top _divider-bottom" v-html="$md.render(third || '')" />
      </div>
    </div>




  </div>
</template>




<script>


import { mapState } from 'vuex'
import Project from '~/components/Project.vue'
import Toggle from '~/components/Toggle.vue'
// import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    // NodeForm,
    Project,
    Toggle,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_content"
    tableQueries: ['_content']
  },

  data () {
    return {

      intro: this.$cytosis.findField('home-intro', this.$store.state['Content'], 'Markdown' ),
      available: this.$cytosis.findField('home-available', this.$store.state['Content'], 'Markdown' ),
      
      self_short: this.$cytosis.findField('home-self-short', this.$store.state['Content'], 'Markdown' ),
      self_long: this.$cytosis.findField('home-self-long', this.$store.state['Content'], 'Markdown' ),

      now: this.$cytosis.findField('home-now', this.$store.state['Content'], 'Markdown' ),
      second: this.$cytosis.findField('home-second', this.$store.state['Content'], 'Markdown' ),
      third: this.$cytosis.findField('home-third', this.$store.state['Content'], 'Markdown' ),
      
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

<style lang="scss" scoped>


</style>

