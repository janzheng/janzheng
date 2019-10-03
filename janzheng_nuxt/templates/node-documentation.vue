
<!-- 
  uses templates/documentation as base template 
-->

<template>
  <div class="Node-Documentation">
    <Documentation>
      <template #sidebar>
        <nav v-if="showSidebar" 
             ref="sidebar"
             :style="sidenavAttrs"
             class="Sidenav _sidebar --sticky --top-1 " 
        >
          <div class="_sidebar-content --max-height-90 ">
            <div v-if="source && source.fields['Node:AbsolutePath']" class="_sidebar-item _sidebar-heading _sidebar-label">
              <div v-html="$md.strip($md.render(source.fields['Data:String'] || ''))" />
            </div>

            <!-- isChecked shifts all submenus to root, otherwise partials are submenus -->
            <!-- this is super useful for sections w/ only one main section -->
            <div :class="pathMatch(source.fields['Node:AbsolutePath']) && !source.fields['Data:isChecked'] ? '--active' : ''" 
                 class="_sidebar-content-group"
            >
              <!-- if using submenus, the root item will be highlighted with nuxt-active -->
              <nuxt-link
                v-scroll-to="{
                  el: '#top',
                  onDone: (element) => { doneScrolling(element) }
                }"
                :to="`${source.fields['Node:AbsolutePath']}#top`" 
                :class="pathMatch(!source.fields['Data:isChecked'] && source.fields['Node:AbsolutePath']) ? 'nuxt-link-active nuxt-link-exact-active' : ''"
                class="_sidebar-item" 
              >
                {{ source.fields['Node:Name'] }}
              </nuxt-link>

              <!-- isChecked shifts all submenus to root, otherwise partials are submenus -->
              <div v-if="pathMatch(source.fields['Node:AbsolutePath'])" :class="!source.fields['Data:isChecked'] ? '_sidebar-submenu' : ''" > 
                <div v-for="(item, index) of source.fields['Node:Nav']" 
                     :key="item" 
                >
                  <!-- <nuxt-link :to="`${source.fields['Node:AbsolutePath'] + source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" >{{ item }}</nuxt-link> -->
                  <nuxt-link 
                    v-scroll-to="{
                      el: source.fields['Node:Nav-Links'][index],
                      onDone: (element) => { doneScrolling(element) }
                    }"
                    :to="`${source.fields['Node:Nav-Links'][index]}`" class="_sidebar-item _sidebar-subitem" 
                  >
                    {{ item }}
                  </nuxt-link>
                </div>
              </div>

            </div>

            <!-- if node has a source, use the source for nav -->
            <div 
              v-for="(item) of sourceChildren" 
              :key="item.id"
              :class="pathMatch(item.fields['Node:AbsolutePath']) ? '--active' : ''" 
              class="_sidebar-content-group"  
            >
              <!-- label -->
              <div 
                v-if="item.fields['Type'] == 'Node:Label'"
                class="_sidebar-item _sidebar-label"
              >
                <div class="_md-pfix" v-html="$md.render(item.fields['Markdown'] || '')" />
              </div>

              <!-- link -->
              <nuxt-link 
                v-if="item.fields['Type'] == 'Node'"
                :to="`${item.fields['Node:AbsolutePath']}`"
                class="_sidebar-item"
              >
                {{ item.fields['Node:Name'] }}
              </nuxt-link>

              <div v-if="pathMatch(item.fields['Node:AbsolutePath'])">
                <div v-if="pathMatch(item.fields['Node:AbsolutePath'])" class="_sidebar-submenu" >
                  <div 
                    v-for="(item2, index) of item.fields['Node:Nav']" 
                    :key="item2" 
                  >
                    <nuxt-link 
                      :to="`${item.fields['Node:AbsolutePath'] + item.fields['Node:Nav-Links'][index]}`"
                      class="_sidebar-item _sidebar-subitem"
                    >
                      {{ item2 }}
                    </nuxt-link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </template>

      <!-- <template> -->
      <!-- <div class="_section-article _margin-bottom "> -->

      <template v-slot:[slotName(node)]>
        <!-- <template> -->
        <div v-html="$md.render(node.fields['Markdown'] || '')" />
        <NodeRenderer :nodes="contents" />
      </template>

      <template #footer />

      <!-- </div> -->
      <!-- </template> -->
    </Documentation>

  </div>
</template>




<script>
  
import { mapState } from 'vuex'
import Documentation from '~/templates/documentation.vue'
import NodeRenderer from '~/components/render/NodeRenderer.vue'

export default {

  components: {
    NodeRenderer,
    Documentation,
  },

  props: {
    'node': Object,
    'route': Object,
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
    this.$store.dispatch("updateCreate", {
      pageName: this.node.fields['Node:Name']
    })

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

    nodeSource() {
      if(this.node && this.node.fields['Node:Source']) {
        let source = this.$cytosis.getLinkedRecords(this.node.fields['Node:Source'], this.Content , true )
        return source.reverse()[0]
      }
      return undefined
    },

    source() {
      // source is either the node's source, or itself!
      return this.nodeSource || this.node
    },

    children() {
      if(this.node.fields['Node:Children']) {
        let children = this.$cytosis.getLinkedRecords(this.node.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
      return undefined
    },

    sourceChildren() {
      if(this.source) {
        let children = this.$cytosis.getLinkedRecords(this.source.fields['Node:Children'], this.Content , true )
        // airtable always returns lists in reverse order
        return children.reverse()
      }
      return undefined
    },

    showSidebar() {
      // check linked content if sidebar is warranted
      if(this.source)
        return true
      return false
    },

    sidenavAttrs() {
      if (!this.isMounted) return

      const windowHeight = window.innerHeight
      const sidebarHeight = this.$refs.sidebar.clientHeight
      if(windowHeight < sidebarHeight) {
        console.log('Sidenav too short:', windowHeight, sidebarHeight)
        return {
          position: 'unset !important',
        }
      }
      return undefined
    }
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
      // console.log('done scrolling', el.id)
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    },

    slotName(node) {
      return node.fields['Render:Slot'] || 'default'
    }
  },


}
</script>

<style>
</style>

