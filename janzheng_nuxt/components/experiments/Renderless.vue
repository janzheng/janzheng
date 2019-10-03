
<!-- 

  example from: https://adamwathan.me/renderless-components-in-vuejs/
  refer to: proptester.vue

 -->

<script>

export default {

  props: {
    'value': Array,
  },

  data() {
    return {
      newTag: '',
      childData: 'bananarama',
    }
  },

  methods: {
    sayHello() {
      console.log('this is a child saying hello!')
    },
    addTag() {
      if (this.newTag.trim().length === 0 || this.value.includes(this.newTag.trim())) {
        return
      }
      this.$emit('input', [...this.value, this.newTag.trim()])
      this.newTag = ''
    },
    removeTag(tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    },
  },

  render() {
    return this.$scopedSlots.default({
      exampleProp: 'universe',
      tags: this.value,
      removeTag: this.removeTag,
      inputAttrs: {
        value: this.newTag,
      },
      addTag: this.addTag,
      inputEvents: {
        input: (e) => { this.newTag = e.target.value },
        keydown: (e) => {
          if (e.keyCode === 13) {
            e.preventDefault()
            this.addTag()
          }
        }
      }
    })
  },
}
</script>

