
<!-- 

  Router for handling node routes / generating pages for node

 -->

<template>
  <div class="Template-Documentation">
    <!-- 
    <div class="_section-page">
      <h6>[ t-router ] </h6>
      <div class="_card _padding">Node: {{ node }}</div>
      <div class="_card _padding">Source: {{ source }}</div>
    </div> -->

    <!-- consider using dynamic loading only after too many templates (> 7) -->

    <!-- For landing pages and basic articles -->
    <TemplateArticle v-if="node.fields['Render:Template'] == 'Article'" :node="node" :route="route" />


    <!-- For lists like alerts, jobs, etc. (not developed, curr. using documentation -->
    <!-- <TemplateDatalist v-if="node.fields['Render:Template'] == 'Article'" :node="node" :route="route" /> -->


    <!-- <TemplateDocs :node="node" :route="route" /> -->
    <TemplateDocumentation v-if="node.fields['Render:Template'] == 'Documentation'" :node="node" :route="route" />

  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

import TemplateArticle from '~/templates/node-article'
// import TemplateBasic from '~/templates/node-basic'
import TemplateDocumentation from '~/templates/node-documentation'


export default {

  components: {
    TemplateArticle,
    // TemplateBasic,
    TemplateDocumentation,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  data () {

    return {
    }
  },

  computed: {
    ...mapState([
      'Content'
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = '/' + unescape(route.params.slug)
    const node = await loadQuery({env, store, routeName: '{node router}', query: 'Node-AbsolutePath', keyword: slug})
    console.log('matched node: ', node, ' @ ', slug)

    return {
      slug,
      route,
      node: node.tables['Content'][0],
    }
  },
  
  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      // console.log('pathMatch',this.route.path)
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true

      // const pathstrs = this.route.path.substring(1).split('/')
      // const secstrs = section.route.substring(1).split('/')

      // if (pathstrs.length == 1) {
      //   return this.route.path.includes(section.route) // partial matches for sub strs
      // }

      // if (pathstrs.length == 2) {
      //   return this.route.path == section.route
      // }

      // // this happens when a subsection like /code/css/variables
      // // matches /code/css — we still want this highlighted
      // if (pathstrs.length > secstrs.length && secstrs.length > 1) {
      //   return this.route.path.includes(section.route)
      // }

      // return this.route.path.includes(section.route) // partial matches for sub strs
      // return section && section.sections && this.route.path == section.route
    },
  },


}
</script>

<style>
</style>

