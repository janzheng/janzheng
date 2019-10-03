
<!-- 

  Renders a list of Atoms linked from another node, as content (on the same document)
  - used by the node- templates

 -->
<template>

  <div class="NodeContent" >
    <div v-for="item of nodes" :key="item.id">
      <div v-if="item.fields['Render:Template'] == 'Form'" >
        <NodeForm :src="item"/>
      </div>
      <div v-else v-html="$md.render(item.fields['Markdown'] || '')" />
    </div>
  </div>

</template>


<script>

import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm,
  },

  props: {
    nodes: Array,
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

