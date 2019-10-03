
<template>
<div class="Coeur Basics">
	<div class="" v-html="$md.render(markdown || '')" />
</div>
</template>


<script>

export default {

  props: {
    atom: Object,
  },

  data: function () {
    return {
    	markdown: 
`
## Basics {#basics}

Practical design system for Phage Directory. Consider moving this document off to a separate repository away from PDv3 in the future. Built on top of Jan's experimental css tool Coeur and heavily inspired by Uber's [Base Web Design System](https://baseweb.design/theming/theming-values/) and the book [Refactoring UI](https://refactoringui.com).

`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

