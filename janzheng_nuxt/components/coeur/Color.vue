
<template>
<div class="Coeur Color">
	<div class="" v-html="$md.render(markdown || '')" />

	<div class="_grid-2">
		<div class="coeur-color-card _inline-block">
			<div class="_color-bg-brand _grid-2-xs _padding-half"><span>brand</span><span>#71EFF5</span></div>
			<div class="_color-bg-brand-110 _color-brand-0 _grid-2-xs _padding-half"><span>brand-110</span><span>#172640</span></div>
			<div class="_color-bg-brand-100 _color-brand-0 _grid-2-xs _padding-half"><span>brand-100</span><span>#204065</span></div>
			<div class="_color-bg-brand-90 _color-brand-0 _grid-2-xs _padding-half"><span>brand-90</span><span>#275F89</span></div>
			<div class="_color-bg-brand-80 _color-brand-0 _grid-2-xs _padding-half"><span>brand-80</span><span>#2E81AA</span></div>
			<div class="_color-bg-brand-70 _color-brand-0 _grid-2-xs _padding-half"><span>brand-70</span><span>#3AA7C8</span></div>
			<div class="_color-bg-brand-60 _color-brand-0 _grid-2-xs _padding-half"><span>brand-60</span><span>#50CDE0</span></div>
			<div class="_color-bg-brand-50 _color-brand-0 _grid-2-xs _padding-half"><span>brand-50</span><span>#71EFF5</span></div>
			<div class="_color-bg-brand-40 _grid-2-xs _padding-half"><span>brand-40</span><span>#9EF3FD</span></div>
			<div class="_color-bg-brand-30 _grid-2-xs _padding-half"><span>brand-30</span><span>#BEF6FF</span></div>
			<div class="_color-bg-brand-20 _grid-2-xs _padding-half"><span>brand-20</span><span>#D6F9FF</span></div>
			<div class="_color-bg-brand-10 _grid-2-xs _padding-half"><span>brand-10</span><span>#E7FBFF</span></div>
			<div class="_color-bg-brand-5 _grid-2-xs _padding-half"><span>brand-5</span><span>#F1FBFF</span></div>
			<div class="_color-bg-brand-0 _grid-2-xs _padding-half"><span>brand-0</span><span>#FBFDFF</span></div>
			<!-- <div class="_color-bg-brand-80 _color-brand-0 _grid-2-xs _padding-half"><span>brand-80</span><span>#0D1D38</span></div>
			<div class="_color-bg-brand-70 _color-brand-0 _grid-2-xs _padding-half"><span>brand-70</span><span>#133D6A</span></div>
			<div class="_color-bg-brand-60 _color-brand-0 _grid-2-xs _padding-half"><span>brand-60</span><span>#196799</span></div>
			<div class="_color-bg-brand-50 _color-brand-0 _grid-2-xs _padding-half"><span>brand-50</span><span>#2597C0</span></div>
			<div class="_color-bg-brand-40 _grid-2-xs _padding-half"><span>brand-40</span><span>#48C7DE</span></div>
			<div class="_color-bg-brand-30 _grid-2-xs _padding-half"><span>brand-30</span><span>#71EFF5</span></div>
			<div class="_color-bg-brand-20 _grid-2-xs _padding-half"><span>brand-20</span><span>#A0F1FE</span></div>
			<div class="_color-bg-brand-10 _grid-2-xs _padding-half"><span>brand-10</span><span>#C0F2FF</span></div>
			<div class="_color-bg-brand-5 _grid-2-xs _padding-half"><span>brand-5</span><span>#D3F0FF</span></div>
			<div class="_color-bg-brand-0 _grid-2-xs _padding-half"><span>brand-0</span><span>#E5F3FF</span></div> -->
		</div>

		<div class="coeur-color-card _inline-block">
			<div class="_color-bg-secondary _color-secondary-0 _grid-2-xs _padding-half"><span>secondary</span><span>#374F6A</span></div>
			<div class="_color-bg-secondary-80 _color-secondary-0 _grid-2-xs _padding-half"><span>secondary-80</span><span>#0F1629</span></div>
			<div class="_color-bg-secondary-70 _color-secondary-0 _grid-2-xs _padding-half"><span>secondary-70</span><span>#21304B</span></div>
			<div class="_color-bg-secondary-60 _color-secondary-0 _grid-2-xs _padding-half"><span>secondary-60</span><span>#374F6A</span></div>
			<div class="_color-bg-secondary-50 _color-secondary-0 _grid-2-xs _padding-half"><span>secondary-50</span><span>#567A95</span></div>
			<div class="_color-bg-secondary-40 _grid-2-xs _padding-half"><span>secondary-40</span><span>#83A4B7</span></div>
			<div class="_color-bg-secondary-30 _grid-2-xs _padding-half"><span>secondary-30</span><span>#B2C7D1</span></div>
			<div class="_color-bg-secondary-20 _grid-2-xs _padding-half"><span>secondary-20</span><span>#D1DEE4</span></div>
			<div class="_color-bg-secondary-10 _grid-2-xs _padding-half"><span>secondary-10</span><span>#E2EDF1</span></div>
			<div class="_color-bg-secondary-5 _grid-2-xs _padding-half"><span>secondary-5</span><span>#E6F3F8</span></div>
			<div class="_color-bg-secondary-0 _grid-2-xs _padding-half"><span>secondary-0</span><span>#EAFAFF</span></div>
		</div>

		<div class="coeur-color-card _inline-block">
			<div class="_color-bg-pink _color-pink-0 _grid-2-xs _padding-half"><span>pink</span><span>#FFE3E8</span></div>
			<div class="_color-bg-pink-80 _color-pink-0 _grid-2-xs _padding-half"><span>pink-80</span><span>#6B0027</span></div>
			<div class="_color-bg-pink-70 _color-pink-0 _grid-2-xs _padding-half"><span>pink-70</span><span>#950031</span></div>
			<div class="_color-bg-pink-60 _color-pink-0 _grid-2-xs _padding-half"><span>pink-60</span><span>#BD053A</span></div>
			<div class="_color-bg-pink-50 _color-pink-0 _grid-2-xs _padding-half"><span>pink-50</span><span>#DF2C5F</span></div>
			<div class="_color-bg-pink-40 _grid-2-xs _padding-half"><span>pink-40</span><span>#FA5486</span></div>
			<div class="_color-bg-pink-30 _grid-2-xs _padding-half"><span>pink-30</span><span>#FF89AB</span></div>
			<div class="_color-bg-pink-20 _grid-2-xs _padding-half"><span>pink-20</span><span>#FFB3C8</span></div>
			<div class="_color-bg-pink-10 _grid-2-xs _padding-half"><span>pink-10</span><span>#E2EDF1</span></div>
			<div class="_color-bg-pink-5 _grid-2-xs _padding-half"><span>pink-5</span><span>#FFD9E2</span></div>
			<div class="_color-bg-pink-0 _grid-2-xs _padding-half"><span>pink-0</span><span>#FFE3E8</span></div>
			<div class="_color-bg-pink--1 _grid-2-xs _padding-half"><span>pink--1</span><span>#FFF1F3</span></div>
		</div>

		<div class="coeur-color-card _inline-block">
			<div class="_color-bg-yellow _color-yellow-80 _grid-2-xs _padding-half"><span>yellow</span><span>#FCCB4C</span></div>
			<div class="_color-bg-yellow-80 _color-yellow-0 _grid-2-xs _padding-half"><span>yellow-80</span><span>#451400</span></div>
			<div class="_color-bg-yellow-70 _color-yellow-0 _grid-2-xs _padding-half"><span>yellow-70</span><span>#733705</span></div>
			<div class="_color-bg-yellow-60 _color-yellow-0 _grid-2-xs _padding-half"><span>yellow-60</span><span>#A06F19</span></div>
			<div class="_color-bg-yellow-50 _color-yellow-0 _grid-2-xs _padding-half"><span>yellow-50</span><span>#CEA033</span></div>
			<div class="_color-bg-yellow-40 _grid-2-xs _padding-half"><span>yellow-40</span><span>#FCCB4C</span></div>
			<div class="_color-bg-yellow-30 _grid-2-xs _padding-half"><span>yellow-30</span><span>#FFDF7D</span></div>
			<div class="_color-bg-yellow-20 _grid-2-xs _padding-half"><span>yellow-20</span><span>#FFEFA7</span></div>
			<div class="_color-bg-yellow-10 _grid-2-xs _padding-half"><span>yellow-10</span><span>#FFFCCB</span></div>
			<div class="_color-bg-yellow-5 _grid-2-xs _padding-half"><span>yellow-5</span><span>#FFFBDE</span></div>
			<div class="_color-bg-yellow-0 _grid-2-xs _padding-half"><span>yellow-0</span><span>#FCFAEF</span></div>
		</div>

		<div class="coeur-color-card _inline-block">
			<div class="_color-bg-mono-80 _color-mono-0 _grid-2-xs _padding-half"><span>mono</span><span>#8FA3B7</span></div>
			<div class="_color-bg-mono-100 _color-mono-0 _grid-2-xs _padding-half"><span>mono-100</span><span>#1E2229</span></div>
			<div class="_color-bg-mono-90 _color-mono-0 _grid-2-xs _padding-half"><span>mono-90</span><span>#3B4451</span></div>
			<div class="_color-bg-mono-80 _color-mono-0 _grid-2-xs _padding-half"><span>mono-80</span><span>#586678</span></div>
			<div class="_color-bg-mono-70 _color-mono-0 _grid-2-xs _padding-half"><span>mono-70</span><span>#74869B</span></div>
			<div class="_color-bg-mono-60 _color-mono-0 _grid-2-xs _padding-half"><span>mono-60</span><span>#8FA3B7</span></div>
			<div class="_color-bg-mono-50 _color-mono-0 _grid-2-xs _padding-half"><span>mono-50</span><span>#ADBECE</span></div>
			<div class="_color-bg-mono-40 _grid-2-xs _padding-half"><span>mono-40</span><span>#C8D4DF</span></div>
			<div class="_color-bg-mono-30 _grid-2-xs _padding-half"><span>mono-30</span><span>#DBE5EC</span></div>
			<div class="_color-bg-mono-20 _grid-2-xs _padding-half"><span>mono-20</span><span>#E8F0F5</span></div>
			<div class="_color-bg-mono-10 _grid-2-xs _padding-half"><span>mono-10</span><span>#F0F7FC</span></div>
			<div class="_color-bg-mono-5 _grid-2-xs _padding-half"><span>mono-5</span><span>#F2F8FD</span></div>
			<div class="_color-bg-mono-0 _grid-2-xs _padding-half"><span>mono-0</span><span>#F4FAFF</span></div>
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
## Colors  {#colors}

`
    }
  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>

