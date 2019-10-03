
<!-- 

 -->
<template>

  <div :class="isToggled ? onClass : offClass " class="Toggle" @click="toggle()" > 
    <slot />
  </div>

</template>


<script>

export default {

  components: {
  },

  props: {
    onClass: {
      type: String,
      default: ''
    },
    offClass: {
      type: String,
      default: ''
    },
  },

  data: function () {
    return {
      isToggled: false,
    }
  },

  methods: {

    toggle() {
      if(this.isToggled)
        this.isToggled = false
      else
        this.isToggled = true
    },

  }

}
</script>

