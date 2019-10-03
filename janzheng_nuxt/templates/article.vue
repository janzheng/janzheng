<template>
  <div :class="
    templateClasses" class="Template-Article _section-page _margin-center _margin-top-2 _margin-bottom-2 _padding-top-2 _padding-bottom-2 ">

    <div class="Template--Main _section-content _margin-bottom _margin-center _margin-top-none-i">
      <slot name="container" >
        <div class="_section-article" >
          <slot name="header" />
          <slot name="default" />
          <slot name="footer" />
        </div>
      </slot>
    </div>

  </div>
</template>




<script>
  
// import { mapState } from 'vuex'
// import Template from '~/templates/article.vue'

export default {

  components: {
    // Template
  },

  props: {
    'templateClasses': String,
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

