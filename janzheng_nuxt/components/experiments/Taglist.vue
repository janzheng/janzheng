
<!-- 

  example from: https://adamwathan.me/renderless-components-in-vuejs/
  refer to: proptester.vue

 -->

<template>
  <div>
    <Renderless :value="value" @input="(tags) => { $emit('input', tags) }">
      <div slot-scope="{ tag, removeTag, inputAttrs, inputEvents, addTags }" class="tags-input">
        <span class="tags-input-tag">
          <span v-for="tag in value" :key="tag" class="_tag _margin-right-half" >
            {{ tag }}
            <span class="tags-input-remove" @click="removeTag(tag)">&times;</span>
          </span>
        </span>
        <input v-bind="inputAttrs"
               class="tags-input-text" 
               placeholder="Add tag..."
               v-on="inputEvents"
        >
      </div>
    </Renderless>

    <!-- 
      <Renderless v-model="tags">
        <div slot-scope="{ inputEvents, inputAttrs, addTag }" class="tags-input">
          <input class="tags-input-text" placeholder="Type a tag" v-on="inputEvents" v-bind="inputAttrs"
          >
          <div @click="addTag">Add it</div>
        </div>
      </Renderless>
    -->
  </div>
</template>

<script>

import Renderless from '~/components/experiments/Renderless.vue'

export default {

  components: {
    Renderless,
  },

  props: {
    value: Array,
  }
  
}
</script>

