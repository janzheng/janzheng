
<template>

  <div class="Formlet Formlet-radiogroup" >

    <label 
      v-if="input.name" 
      :for="input.name" 
      class="_form-label" 
      v-html="$md.render(input.label || '')" 
    />
    <label 
      v-if="input.description" 
      :for="input.name" 
      class="_form-label _form-desc" 
      v-html="$md.render(input.description || '')" 
    />

    <!-- <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label> -->

    <div v-for="option in input.options" :key="option.value" class="_form-radio --inline" >
      <label :for="option.value" class="_form-radio-label"> 
        <input :id="option.value"
               v-model.trim="data" 
               :name="option.value" 
               :value="option.value"
               type="radio" 
               @change="$emit('change', data)"
        >
        <span :for="option.value">{{ option.label }}</span>
      </label>
    </div>
    <label v-if="isFieldInvalid && errorMessage" class="_error" >{{ errorMessage }}</label>
  </div>

</template>

<script>

export default {

  props: {
    input: Object,
    type: String,
    inputAttrs: String, // classes that might be applied to every input
    v: Object, // validation object, for errors and messages
    onSubmit: Boolean, // fires when submit cta is clicked
  },

  data: function () {
    return {
      data: '' // note that data can't be a prop since it needs to be bound
      // we're emitting the data back as a @input
    }
  },

  computed: {
    isFieldInvalid() {
      // remember to pass down the correct v model — the object that shares 
      // this object's name!
      if (this.v)
        return this.v.$invalid
      return undefined
    },
    errorMessage () {
      // some errors only show AFTER user clicks CTA
      if(this.onSubmit) {
        // only error for these types is if you've clicked or not clicked
        if(this.input.error && typeof(this.input.error) == 'string')
          return this.input.error

        // if(!this.v.required)
          // return 'This field is required'
      }
      return undefined

      // NOT SUPPORTED YET — if input is an object 
      // e.g. error.$email, error.$required, etc. — would match the v model
      // so you can create custom messages for different situations,
      // like email is wrong etc.
      // else if(input.error)
      // if (!message && this.$v.fieldData[input.name].$required)
      //   message = "This field is required"

      // return message
    },
  },


  methods: {
    
  }

}
</script>

<style lang="scss" scoped>

</style>

