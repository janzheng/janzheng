

<template>

  <div class="Project  clearfix" :class="toggle ? '--open' : '_pointer'">
  	<Toggle class="clearfix" 
            @toggle="(data) => { toggle = data }" 
  	>
      <template #off>
      	<div class="_padding-2 clearfix">
	      	<img :src="logo_url" class="Project-logo _pointer " :style="project.fields['Logostyle']">
	      	<h4 v-if="project.fields['Short']" class="_margin-top --title" style="width: 44ch">{{project.fields['Short']}}</h4>
	      </div>
      	<!-- Off / {{ project.fields['Name'] }} / {{ logo_url }} -->
      </template>

      <template #on>
      	<div class="_padding-2 clearfix">
	      	<img :src="logo_url" class="Project-logo _pointer _margin-bottom-2" :style="project.fields['Logostyle']">
	      	<div>
            <h4 v-if="project.fields['Short']" class="_margin-top --title" style="width: 44ch">{{project.fields['Short']}}</h4>
		      	<div class="_section-narrow _margin-top-none-i" @click.stop="" v-html="$md.render( project.fields['Markdown'] || '')" />
		      	<div>
		      		<span class="_padding-right">Website:</span><a :href="project.fields['URL']">{{ project.fields['URL'] }}</a>
		      	</div>
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




