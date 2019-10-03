<template>
  <div class="Template-Manuscript-Capsid _margin-top-2 _margin-bottom-2 _grid-4-1-sm _grid-gap _center-margin _container _padding _section-content">


    <!-- Side bar / Side menu -->
    <div class="Template--Context">
      <nav class="Sidebar --sticky --top-1 ">
        <div class="--max-height-90">
          <slot name="sidebar" />
        </div>
      </nav>
    </div>


    <div class="Template--Main">

      <slot name="intro" />

      <slot />

      <slot name="footer" />

    </div>
  </div>


</template>




<script>
  
import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'

export default {

  components: {
  },

  props: {
    'sidebar': Object,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {

    return {
      isMounted: false,
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

  beforeCreate () {
  },
  mounted () {
    this.isMounted = true
  },
  beforeDestroy() {
  },

  methods: {
    pathMatch(path) {
      if(!this.route.path)
        return false

      if(this.route.path == path)
        return true
    },

    doneScrolling(el) {
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    }
  },


}
</script>

<style>
</style>

