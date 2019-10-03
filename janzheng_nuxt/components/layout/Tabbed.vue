
<!-- 

  Tab functionality — unlike normal tabs, this one doesn't keep track of its own active state
  - it lets you pass data object through and customize classes though, but logic remains in the parent
  - uses slots to make it easier to stuff the tabs
  - to set things as active, handle the emitted value and set they key as the active string
  - use the old syntax for dynamic slotting

 -->

<template>

  <!-- tabs that are actually links — use routing to perform tab behavior -->
  <div class="Tabbed" :class="tabOuterAttrs" > 
    <div class="Tabbed-container">
      <div :class="tabAttrs" class="Tabbed-menu">
        <slot name="left">
          <div v-if="left" class="Tabbed-links Tabbed-left">
            <div v-for="key of Object.keys(left)" :id="key" :key="key" :class="classes(left[key],key)" class="Tabbed-tab _relative" >
              <router-link
                v-if="left[key].link" 
                :to="left[key].link" 
                :class="classes(left[key])" 
                class=" _relative"
              >{{ key }}</router-link>
              <span v-else 
                    :class="classes(left[key])" 
                    class=" _relative"
                    @click="clickHandler(left[key],key)"
              >{{ key }}</span>
            </div>
          </div>
        </slot>
        <slot name="right">
          <div v-if="right" class="Tabbed-links Tabbed-right">
            <div v-for="key of Object.keys(right)" :id="key" :key="key" :class="classes(right[key],key)" class="Tabbed-tab _relative" >
              <router-link
                v-if="right[key].link" 
                :to="right[key].link" 
                :class="classes(right[key])" 
                class=" _relative"
              >{{ key }}</router-link>
              <span v-else 
                    :class="classes(right[key])" 
                    class=" _relative"
                    @click="clickHandler(right[key],key)"
              >{{ key }}</span>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- default slot if you want content to appear like it's slotted -->
    <slot>
      <div class="Tabbed-contents">
        <div v-for="key of contents" 
             :id="key+'_content'"
             :key="key+'_content'"
             class="Tabbed-contents-block _relative" 
        >
          <slot :name="key" />
        </div>
      </div>
    </slot>

  </div>
</template>

<script>


export default {

  components: {
  },

  // source is the form's json source
  props: {
    'activeTab': String, // set this to the name of the tab to make it active
    'left': Object, // array of string for left side of the menu
    'right': Object, // array of string for right side of the menu
    /*
      these objects can have:
      - attrs: 'class names',
      - active: true,
      - link: 'local url' — these would be handled by the router and intercepted
    */
    'tabAttrs': {
      type: String,
      default: '_grid-3-1-sm Tabbed-mobile',
    },
    'tabOuterAttrs': {
      type: String,
      // default: '_section-article _margin-center _margin-bottom-2',
      default: '_margin-bottom-2',
    },
  },

  data: function () {
    return {
    }
  },

  computed: {
    both() {
      return {...this.left, ...this.right}
    },
    contents() {
      return Object.keys(this.both).filter(t => t == this.activeTab)
    }
  },

  // set active state based on anchor
  // mounted() {
  // }
  
  methods: {
    clickHandler(item,key) {
      // console.log(`'emitting: '${key}'`)
      this.$emit(`${key}`, item)
      this.$emit(`tabClick`, item,key)

      this.$router.push({
        // path: this.$router.currentRoute.path + '#' + this.$slugify(key),
        path: this.$router.currentRoute.path,
        query: { tab: this.$slugify(key) }
      })
    },
    classes(item,key) {
      // console.log('classes:', item, key)
      let classes = item.attrs
      if (item.active)
        classes += ` --active`

      else if(this.activeTab == key)
        classes += ` --active`

      return classes
    },
  },


}
</script>

<style lang="scss" scoped>

</style>

