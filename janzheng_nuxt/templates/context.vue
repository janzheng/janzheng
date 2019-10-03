<template>
  <div class="Template-Context _section-page _margin-center _padding-top-2 _padding-bottom-2 " :class="templateClasses">

    <slot name="header-container" >
      <div class="Template--Header _section-content _margin-bottom _margin-center _margin-top-none-i">
        <slot name="header" />
      </div>
    </slot>

    <div :class="gridClasses">
      <slot name="sidebar-container">
        <div class="Template--Sidebar">
          <nav :class="sidebarClasses" class="_sidebar">
            <div class="">
              <slot name="sidebar" />
              <slot name="context" />
            </div>
          </nav>
        </div>
      </slot>
      
      <slot name="main-container" >
        <div class="Template--Main _margin-bottom ">
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

export default {

  components: {
  },

  props: {
    'templateClasses': String,
    'sidebarClasses': String,
    'gridClasses': {
      type: String,
      default: 'Template--Main-Sidebar _grid-2-1-sm _grid-gap ',
    }
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQueries: ["_content"]
  },

  // runs on generation and page route (but not on first page load)
  // async asyncData({env, store, route}) {
  // },

  data () {
    // this.$store.dispatch("updateCreate", {
    //   pageName: this.node.fields['Node:Name']
    // })

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
  },


}
</script>

<style>
</style>

