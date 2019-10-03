
<template>
<div class="Coeur Typography">
	<div class="" v-html="$md.render(markdown || '')" />

  <div class="">

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font--2
      </div>
      <div class="coeur-typography-sample _font--2">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 12px, font-weight: normal, line-height: 30px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font--1 / size-smaller
      </div> 
      <div class="coeur-typography-sample _font--1">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 14px, font-weight: normal, line-height: 21px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font / body copy
      </div>
      <div class="coeur-typography-sample _font">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 16px, font-weight: normal, line-height: 24px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-1
      </div>
      <div class="coeur-typography-sample _font-1">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 18px, font-weight: normal, line-height: 27px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-2
      </div>
      <div class="coeur-typography-sample _font-2">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 20px, font-weight: normal, line-height: 30px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-3
      </div>
      <div class="coeur-typography-sample _font-3">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 24px, font-weight: normal, line-height: 32px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-4
      </div>
      <div class="coeur-typography-sample _font-4">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 32px, font-weight: normal, line-height: 40px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-5
      </div>
      <div class="coeur-typography-sample _font-5">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 40px, font-weight: normal, line-height: 48px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-6
      </div>
      <div class="coeur-typography-sample _font-6">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 48px, font-weight: normal, line-height: 58px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-7
      </div>
      <div class="coeur-typography-sample _font-7">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 56px, font-weight: normal, line-height: 67px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-8
      </div>
      <div class="coeur-typography-sample _font-8">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 64px, font-weight: normal, line-height: 64px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        font-9
      </div>
      <div class="coeur-typography-sample _font-9">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </div>
      <div class="coeur-typography-desc _font--1">
        (font-size: 80px, font-weight: normal, line-height: 80px)
      </div>
    </div>


    <h4>Contextual Typography</h4>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h1
      </div>
      <h1 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h1>
      <div class="coeur-typography-desc _font--1">
        (font-size: 32px, font-weight: 700, line-height: 40px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h2
      </div>
      <h2 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h2>
      <div class="coeur-typography-desc _font--1">
        (font-size: 24px, font-weight: 700, line-height: 32px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h3
      </div>
      <h3 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h3>
      <div class="coeur-typography-desc _font--1">
        (font-size: 20px, font-weight: 700, line-height: 30px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h4
      </div>
      <h4 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h4>
      <div class="coeur-typography-desc _font--1">
        (font-size: 20px, font-weight: normal, line-height: 30px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h5
      </div>
      <h5 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h5>
      <div class="coeur-typography-desc _font--1">
        (font-size: 18px, font-weight: 700, line-height: 27px)
      </div>
    </div>

    <div class="coeur-typography-card _padding-bottom-2">
      <div class="coeur-typography-title">
        h6
      </div>
      <h6 class="coeur-typography-sample">
        The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! The quick brown fox jumps over the lazy dog! 
      </h6>
      <div class="coeur-typography-desc _font--1">
        (font-size: 14px, font-weight: 700, line-height: 30px, letter-spacing: 1.2px )
      </div>
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
## Typography {#typography}

Typography follows the same scale as the Sizing scale, but sizing like h1, h2, p, etc. _may change with context_ and publications like Capsid & Tail might look different than the guidelines below. Also, I'm using 'px' because they stay consistent; the rem calculator could be used to convert to rem in some instances.

`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

