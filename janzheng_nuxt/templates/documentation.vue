
<!-- 

  Root template for documentation pages

  [ sidebar ] [ main ] 

 -->

<template>
  <div :class="templateClasses" class="Template-Documentation _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2 _section-page _margin-center ">

    <slot name="header-container" >
      <div class="Template--Header">
        <slot name="header" />
      </div>
    </slot>

    <div class="Template-Grid _grid-1-4 _grid-gap ">
      <!-- Side bar / Side menu -->
      <slot name="sidebar-container">
        <div class="Template--Sidebar Sidebar">
          <nav class="_sidebar --sticky --top-1 ">
            <div class="--max-height-90">
              <slot name="sidebar" />
              <slot name="context" />
            </div>
          </nav>
        </div>
      </slot>

      <slot name="main-container" >
        <div class="Template--Main _section-article _margin-bottom ">
          <slot name="default" />
        </div>
      </slot>
    </div>

    <slot name="footer-container" >
      <div class="Template--Footer">
        <slot name="footer" />
      </div>
    </slot>

  </div>

</template>




<script>
  
// import { mapState } from 'vuex'
// import { loadQuery } from '~/other/loaders'

export default {

  components: {
  },

  props: {
    'templateClasses': String,
    'sidebar': Object, // options for open, closed, off/undefined
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
    // ...mapState([
    //   'Content'
    //   ]),

    // contents() {
    //   let contents = this.$cytosis.getLinkedRecords(this.node.fields['Node:Contents'], this.Content , true )
    //   return contents.reverse()
    // },
  },

  beforeCreate () {
  },
  created(){
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

