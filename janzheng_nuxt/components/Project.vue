

<template>

  <div class="Project  clearfix" :class="toggle ? '--open' : '_pointer'">
    <Toggle class="clearfix" 
            @toggle="(data) => { toggle = data }" 
    >
      <template #off>
        <div class="_padding-2">
          <div class="_grid-1-4 _grid-gap-large">
            <img :src="logo_url" class="Project-logo _pointer " :style="project.fields['Logostyle']">
            <div>
              <h3 v-if="project.fields['Short']" class="_font-serif --large _margin-top-none-i --title _inline-block" style="">{{project.fields['Short']}}</h3>
              <div class="_font-small _color-gray-lighter " v-if="project.fields['Data:Tags']">{{ project.fields['Data:Tags'].join(', ') }}</div>

              <div class="_padding-top _hidden-sm-up">
                <button class="_button --projbtn --short">Learn more</button>
              </div>
            </div>
          </div>
          <!-- Off / {{ project.fields['Name'] }} / {{ logo_url }} -->
        </div>
      </template>

      <template #on>
        <div class="_padding-2 _grid-1-4 _grid-gap-large">
          <img :src="logo_url" class="Project-logo _pointer _margin-bottom-2" :style="project.fields['Logostyle']">
          <div>
            <h3 v-if="project.fields['Short']" class="_font-serif _margin-top-none-i --large --title _inline-block" style="">{{project.fields['Short']}}</h3>
            <div class="_section-narrow _margin-top-none-i" @click.stop="" v-html="$md.render( project.fields['Markdown'] || '')" />
            <div>
              <span class="_padding-right">Website:</span><a :href="project.fields['URL']">{{ project.fields['URL'] }}</a>
            </div>
            <div class="_font-small _color-gray-lighter _padding-top" v-if="project.fields['Data:Tags']">{{ project.fields['Data:Tags'].join(', ') }}</div>
          </div>
        </div>
      </template>
    </Toggle>
  </div>

</template>

<script>

import Toggle from '~/components/Toggle.vue'

export default {

  props: {
    project: Object,
  },

  components: {
    Toggle,
  },

  data: function () {
    return {
      toggle: false,
    }
  },

  computed: {
    logo_url() {
      if(this.project && this.project.fields['Attachments'])
        return this.project.fields['Attachments'][0]['url']
      return undefined
    }
  },

  mounted: async function () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>




