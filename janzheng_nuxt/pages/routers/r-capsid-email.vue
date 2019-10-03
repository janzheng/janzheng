
<!--  

  Router for Capsid & Tail issues
  // basis for other manuscript routers

-->

<template>
  <div class="Router-Capsid-email Capsid-email">

    <!-- the route should match against a slug and only the first matched slug should be relevant -->
    <Capsid :issue="Manuscripts[0]" :atoms="atoms" :route="route" />


  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import { loadQuery } from '~/other/loaders'

// import CapsidTemplate from '~/templates/node-capsid-email'
import Capsid from '~/components/publications/CapsidEmail.vue'

export default {

  components: {
    Capsid,
  },

  // layout: 'contentframe',
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
      'Content',
      'Manuscripts',
      ]),

    contents() {
      let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
      return contents.reverse()
    },
  },

  // runs on generation and page route (but not on first page load)
  async asyncData({env, store, route}) {
    const slug = unescape(route.params.slug)
    // const node = await loadQuery({env, store, '{capsid router}', 'Node-AbsolutePath', slug})
    // console.log('matched node: ', node, ' @ ', slug)

    const manuscript = await loadQuery({env, store, routeName:'{capsid router}', query:'capsid-single', keyword: slug})
    // console.log('matched manuscript: ', manuscript, ' @ ', slug)

    // fetches the relevant atoms into the store
    const atoms = await loadQuery({env, store, routeName:'{capsid router}', query:'capsid-atoms', keyword: manuscript.tables.Manuscripts[0].fields['Name']})
    console.log('matched atoms: ', atoms, ' @ ', manuscript.tables.Manuscripts[0].fields['Name'])

    return {
      slug,
      route,
      manuscript: manuscript.tables.Manuscripts[0],
      atoms: atoms.tables.Atoms,
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
    },
  },


}
</script>

<style>
</style>

