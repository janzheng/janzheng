
<template>
<div class="Coeur Depth">
	<div class="" v-html="$md.render(markdown || '')" />

  <h3>Flats</h3>

  For flat design, use a light background and/or border color.

  <div class="_color-bg-mono-0">
    <div class="coeur-depth _margin-bottom-2">
      <div class="_square-13 _color-bg-brand-5 _width-100 _padding _margin-bottom">
        class="_color-bg-brand-5"
      </div>
      <div class="_square-13 _border-solid _color-border-brand-5 --medium _radius _width-100 _padding _margin-bottom ">
        class="_border-solid _color-border-brand-5 --medium"
      </div>
    </div>
  </div>






  <h3>Shadows</h3>

  <div class="_padding-2 _color-bg-brand-0">
    <div class="coeur-depth _margin-bottom-2">
      shadow-1 — 0 1px 1px hsla(0, 0%, 0%, 0.08)
      <div class="_shadow-1 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      shadow-2 — 0 1px 4px hsla(0, 0%, 0%, 0.18)
      <div class="_shadow-2 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      shadow-3 — 0 2px 8px hsla(0, 0%, 0%, 0.18)
      <div class="_shadow-3 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      shadow-4 — 0 4px 16px hsla(0, 0%, 0%, 0.18)
      <div class="_shadow-4 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      shadow-5 — 0 8px 24px hsla(0, 0%, 0%, 0.18)
      <div class="_shadow-5 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      shadow-6 — 0 16px 36px hsla(0, 0%, 0%, 0.18)
      <div class="_shadow-6 _square-11 _color-bg-mono-0"></div>
    </div>
  </div>



  <h3>Insets</h3>

  <div class="_padding-2 _color-bg-brand-0">
    <div class="coeur-depth _margin-bottom-2">
      inset-2 — 0 1px 4px hsla(0, 0%, 0%, 0.18)
      <div class="_inset-2 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      inset-3 — 0 2px 8px hsla(0, 0%, 0%, 0.18)
      <div class="_inset-3 _square-11 _color-bg-mono-0"></div>
    </div>
    <div class="coeur-depth _margin-bottom-2">
      inset-4 — 0 4px 16px hsla(0, 0%, 0%, 0.18)
      <div class="_inset-4 _square-11 _color-bg-brand-5"></div>
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
## Depth {#depth}

Don't go overboard — use shadows and insets sparingly, and keep things flat — this will make them really stand out.

`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

