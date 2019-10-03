
<template>

  <div v-if="inputs" class="Formlet" >

    <div v-for="input in inputs" :key="input.name" :class="input.required ? '--required' : '' " class="item--field" >
      
      <!-- <div>INPUT: {{ input.type }}</div> -->
      <div 
        v-if="input.type==INPUT_TYPES.TEXT || 
          input.type==INPUT_TYPES.EMAIL || 
          input.type==INPUT_TYPES.NUMBER || 
          input.type==INPUT_TYPES.URL" 
        class="_form-control" >
        <FormletInput 
          :input="input" 
          :input-attrs="input.attrs" 
          :type="input.type.toLowerCase()" 
          :v="$v.fieldData[input.name]"
          :on-submit="onSubmit"
          :submit-handler="submitHandler"
          @input="(data) => { validationUpdate(data, input) }" 
        />
      </div>

      <div v-if="input.type==INPUT_TYPES.TEXTAREA" class="_form-control" >
        <FormletTextarea 
          :input="input" 
          :input-attrs="input.attrs" 
          :type="input.type.toLowerCase()" 
          :v="$v.fieldData[input.name]"
          :on-submit="onSubmit"
          @input="(data) => { validationUpdate(data, input) }" 
        />
      </div>

      <div v-if="input.type==INPUT_TYPES.RADIO" class="_form-control _form-radiogroup" >
        <FormletRadiogroup 
          :input="input" 
          :input-attrs="input.attrs" 
          :type="input.type.toLowerCase()" 
          :v="$v.fieldData[input.name]"
          :on-submit="onSubmit"
          @change="(data) => { validationUpdate(data, input) }" 
        />
      </div>

      <div v-if="input.type==INPUT_TYPES.CHECKBOX" class="_form-control _form-radiogroup" >
        <FormletCheckboxgroup 
          :input="input" 
          :input-attrs="input.attrs" 
          :type="input.type.toLowerCase()" 
          :v="$v.fieldData[input.name]"
          :on-submit="onSubmit"
          @change="(data) => { validationUpdate(data, input) }" 
        />
      </div>

      <div v-if="input.type==INPUT_TYPES.MARKDOWN" class="_form-markdown" >
        <div class="_padding-top _padding-bottom _margin-bottom" v-html="$md.render(input.markdown || '')" />
      </div>

    </div>
  </div>

</template>

<script>

// import Vue from 'vue'
import _ from '~/other/lodash.custom.min.js'

const INPUT_TYPES = {
  "TEXT":     'TEXT',     // input text, generic; default
  "EMAIL":    'EMAIL',    // email input
  "URL":      'URL',      // url input
  "NUMBER":   'NUMBER',   // number input
  "TEXTAREA": 'TEXTAREA', // text area
  "RADIO":    'RADIO',    // radio button group
  "CHECKBOX": 'CHECKBOX', // checkbox group        
  "MARKDOWN": 'MARKDOWN', // random markdown comments        
}

// used for validation
import { validationMixin } from 'vuelidate'
import { required, email, numeric, maxLength } from 'vuelidate/lib/validators'
import FormletInput from '~/components/layout/Formlet-input'
import FormletTextarea from '~/components/layout/Formlet-textarea'
import FormletRadiogroup from '~/components/layout/Formlet-radiogroup'
import FormletCheckboxgroup from '~/components/layout/Formlet-checkboxgroup'


export default {

  components: {
    FormletInput,
    FormletTextarea,
    FormletRadiogroup,
    FormletCheckboxgroup,
  },

  mixins: [validationMixin],
  props: {
    inputs: Array,
    inputAttrs: String, // classes that apply to every input
    onSubmit: Boolean, // fires when submit cta is clicked; used to show validation
    submitHandler: Function, // submit handler to process @keyup handling
  },

  data: function () {
    return {
      INPUT_TYPES: INPUT_TYPES,
      isValidating: false, // false when not validating anymore; for delay validation
      fieldData: {},
      initialized: false,
    }
  },

  // vuelidate
  // generate validations from form fields — results in $v validation object
  validations: function() {

    let fieldData = {} // needs same name to sync w/ data.fieldData;
    const _this = this

    this.inputs.forEach(function(input) {

      if(!input.name) // skipping "markdown" and other types that don't have names
        return

      fieldData[input.name] = {}

      // so we don't re-initialize on prop change
      if(!_this.initialized)
        _this.$set(_this.$data.fieldData, input.name, null)

      if (input.required) { 
        fieldData[input.name]['required'] = required
      } 
      if (input.type == INPUT_TYPES.EMAIL) { 
        fieldData[input.name]['email'] = email
      }
      if (input.type == INPUT_TYPES.NUMBER) { 
        fieldData[input.name]['numeric'] = numeric
      }

      if (input.maxLength) { 
        fieldData[input.name]['maxLength'] = maxLength(input.maxLength)
      }

    })

    // console.log('fieldData:', fieldData)
    this.initialized = true

    return {
      fieldData
    }
  },

  computed: {
  },


  methods: {
    touch() {
      this.$v.$touch()
    },

    keyEnterHandler() {
      console.log('key enter pressed')
    },

    // update validation model when inputs change
    // validateForm (event, $v, ms=300) { // delay form validation 
    validationUpdate (_data, input, ms=300) { // delay form validation 
      const _this = this, fieldName = input['name']
      this.isValidating = true
      this.$emit('onValidating', this.isValidating)

      // update the field data
      this.fieldData[fieldName] = _data
      // this.$set(data, fieldName, _data)
      // this.$set(this.$data.fieldData, 'b', 2)

      // touch the fields to update the validation model
      this.$v.fieldData[fieldName].$touch()
      // this.$v.$touch()
      // console.log('validationUpdate, evt:', _data, input['name'], this.$v)
      // console.log('vvv:', _data, input['name'], this.$v)

      // this.validate()

      const touch = function() {
        // once touched, it'll check if valid and emit the data to the parent
        // the parent can handle the @onValid however it wants to in a fn 
        _this.$v.$touch()
        _this.$v.$reset() // reset so they can be touched / validated again
        _this.isValidating = false

        if(_this.isFormValid()) {
          _this.$emit('isValidating', _this.isValidating)
          _this.$emit('onValid', _this.$v.fieldData)
        }
        else {
          _this.$emit('onValid', undefined)
        }
      }
      _.throttle(touch, ms)()
    },

    // isFieldInvalid (input) {
    //   // given input field, do we display an error message?
    //   // yes if:
    //   //    required
    //   //    AND error
    //   if (this.$v.fieldData !== undefined )
    //     return this.$v.fieldData[input.name].$error
    //   return false // no error
    // },
    isFormValid () {
      // console.log('validating: ', this.isValidating, ' valid', !this.$v.$invalid, ' combo ', !this.isValidating && !this.$v.$invalid)
      return !this.isValidating && !this.$v.$invalid
    },
    // errorMessage (input) {
    //   if (this.$v.fieldData !== undefined ) {
    //     let message
    //     if (this.$v.fieldData[input.name].$error)
    //       message = input.error
    //     if (!message && this.$v.fieldData[input.name].$required)
    //       message = "This field is required"

    //     return message
    //   }
    // },
  }

}
</script>

<style lang="scss" scoped>

</style>

