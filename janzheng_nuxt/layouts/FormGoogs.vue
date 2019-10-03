

<template>

  <form id="form" action="https://script.google.com/macros/s/AKfycby01BhE83Qmd8ARcKdviWgZjsY1aPxLDs3p9qAMLMt0GTwUKtXx/exec">

    <div class=" _grid-three-one">
      <div>
        <div class="_right">
          <h4 class="_padding-bottom-none _inline">Hello,</h4>
          my name is 
          <input id="name" class="_form-input _inline _margin-right-none-i" type="text" name="name" placeholder="coolest name ever" required/> 
        </div>
        <div class="_right">
          at 

          <input id="email" class="_form-input _inline _margin-right-none-i" type="text" name="email" placeholder="awesome@email.com" /> 
        </div>

        <div class="_right">
          and <input id="shortMessage" class=" _form-input _inline _margin-right-none-i" type="text" name="shortMessage" placeholder="I think..." required/>
        </div>

        <div class="_right _form-fake">
          fake <input id="fake" class=" _form-input _inline _margin-right-none-i" type="text" name="fake" placeholder="umm..."/>
        </div>

        <!-- <div class="_padding-top" >
          <textarea rows="2" id="message" class="_form-input"  type="text" name="message" placeholder="leave a message *" ></textarea>
        </div> -->

      </div>

      <div class="_align-vertically _align-bottom" >
        <button class="_margin-top-xs _margin-bottom-none _padding-left-half _padding-right-half _margin-left-none _inline _button _button-short --outline">send away!</button>
      </div>

    </div>
  </form>

</template>

<script>

// import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
  },

  data: function () {
    return {
    }
  },

  computed: {
  },

  mounted: async function () {
  },

  methods: {
  }
}
</script>

