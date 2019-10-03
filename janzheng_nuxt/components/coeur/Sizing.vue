
<template>
<div class="Coeur Sizing">
	<div class="" v-html="$md.render(markdown || '')" />

  <div class="_grid-2">
    <div>
      <div class="_grid-2 _padding-half"><span>size--4 (4px)</span><span class="_square--4 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size--3 (8px)</span><span class="_square--3 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size--2 (10px)</span><span class="_square--2 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size--1 (12px)</span><span class="_square--1 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size (16px)</span><span class="_square-base _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-1 (18px)</span><span class="_square-1 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-2 (20px)</span><span class="_square-2 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-3 (24px)</span><span class="_square-3 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-4 (32px)</span><span class="_square-4 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-5 (40px)</span><span class="_square-5 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-6 (48px)</span><span class="_square-6 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-7 (56px)</span><span class="_square-7 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-8 (64px)</span><span class="_square-8 _color-bg-brand"></span></div>    
      <div class="_grid-2 _padding-half"><span>size-9 (80px)</span><span class="_square-9 _color-bg-brand"></span></div>
    </div>
    <div>
      <div class="_grid-2 _padding-half"><span>size-10 (96px)</span><span class="_square-10 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-11 (112px)</span><span class="_square-11 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-12 (128px)</span><span class="_square-12 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-13 (144px)</span><span class="_square-13 _color-bg-brand"></span></div>
      <div class="_grid-2 _padding-half"><span>size-14 (192px)</span><span class="_square-14 _color-bg-brand"></span></div>
    </div>
  </div>

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
## Sizing {#sizing}


`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

