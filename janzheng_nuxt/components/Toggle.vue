
<!-- 
  Toggle between off and on; useful for closed/open state (and others)
 -->
<template>

  <div :class="isOn ? onClass : offClass " class="Toggle" @click="toggle()" >
    <slot v-if="!isOn" name="off" />
    <slot v-else name="on" />
  </div>

</template>


<script>

export default {

  components: {
  },

  props: {
    override: {
      type: Boolean,
      default: false
    },
    onClass: {
      type: String,
      default: ''
    },
    offClass: {
      type: String,
      default: ''
    },
    noCloseAllowed: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      on: false,
    }
  },

  computed: {
    isOn() {
      if(this.override)
        return true

      if(this.on)
        return true
      return false
    }
  },

  methods: {

    toggle() {
      if(this.on && !this.noCloseAllowed) 
        this.on = false
      else
        this.on = true

      this.$emit('toggle', this.on)
    },
    open() {
      this.on = true
    },
    close() {
      this.on = false
    },

  }

}
</script>

