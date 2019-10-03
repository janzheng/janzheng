
<!-- 

  example from: vue-mastery render components
  refer to: proptester.vue

 -->


<script>


export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    productRenderer: {  // <-- Here's our new prop
      type: Function,
      default (h, product) { // <-- By default just print the name
        return product.name
      }
    }
  },
  render(h) {
    return h('ul', [
      this.products.map(product =>
        h('li', [this.productRenderer(h, product)]) // use our new prop
      )
    ])
  }
}
</script>

