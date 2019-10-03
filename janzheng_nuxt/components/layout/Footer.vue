<template>
  <div class="Footer">

    <div class="_section-page _padding-top-2 _padding-bottom ">

      <div class="_footer-left">
        <div v-html="$md.render(content || '')" />

        <!-- <FormGoogs /> -->
      
        <div class="">
          <!-- <span>Jan Zheng <span class="_currentYear"> {{thisYear}}</span></span> -->
          <span><a class="_margin-right" href="https://github.com/janzheng">Github</a></span>
          <span><a class="_margin-right" href="https://www.linkedin.com/in/janzh/">Linkedin</a></span>
          <span><a class="_margin-right" href="https://twitter.com/yawnxyz">@yawnxyz</a></span>
          <span><a class="_margin-right" href="/resume.pdf">resume</a></span>
          <span><a class="" href="mailto:hello@janzheng.com">hello@janzheng.com</a></span>
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import FormGoogs from '~/components/FormGoogs.vue'


export default {

  components: {
    FormGoogs,
  },

  data () {
    return {
      content: this.$cytosis.findOne('footer', this.$store.state['Content'] ).fields['Markdown'],
    }
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },

  methods: {
    doneScrolling(el) {
      // console.log('done scrolling', el.id)
      this.$router.push({
        path: this.route.path + '#' + el.id
      })
    }
  }


}
</script>

<style lang="scss">

</style>




