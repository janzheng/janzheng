
<template>
  <!-- <header class="Header _section-page _padding-top _padding-bottom _margin-center"> -->
  <div class="Header-container ">

    <header class="Header ">
      <div class="Header-content" v-if="header">
        <div class="Header-desktop _section-page" v-html="$md.render(header || '')">
        </div>
      </div>
    </header>
  </div>
</template>


<script>

import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      // searchString: this.$store.state.search.string,
      header: this.$cytosis.findOne('header', this.$store.state['Content'] ).fields['Markdown'],
      isHome: this.pathMatch('/') ? true : false
    }
  },

  computed: {
    ...mapState([
      'navOpen',
    ]),
    searchString: {
      get: function () {
        return this.$store.state.search.string
      },
      // setter
      set: function (str) {
        this.$store.dispatch("updateCreate", {
          search: {
            string: str,
            url: this.$router.currentRoute.fullPath,
          }
        })
        // const url = `/search/${str}`
      }
    },
    searchQuery() {
      if(this.searchString)
        return `?search=${this.searchString}`
      return ''
    },
  },

  watch: {
    '$route' () {
      this.isHome = this.pathMatch('/') ? true : false
    }
  },

  mounted() {
    const querySearchString = this.$router.currentRoute.query.search
    if(querySearchString) {
      // this.$store.dispatch("updateCreate", {
      //   searchSource: "header",
      //   searchString: searchString || "",
      //   searchUrl: this.$router.currentRoute.fullPath,
      // })
      this.$store.dispatch("updateCreate", {
        search: {
          string: querySearchString,
          url: this.$router.currentRoute.fullPath,
        }
      })
    }
  },
  
  methods: {
    search() {
      // const url = `/search/${this.searchString}`

      // const slug = this.$router.params.slug
      const route = this.$router.currentRoute
      let base = 'hosts'

      if(route.path == '/orgs' || route.path == '/people' || route.path == '/labs')
        base = route.path

      const url = `${base}?search=${this.searchString}`
      console.log("handling search:",this.searchString, 'route:', route)
      console.log("search url:", url, "?", this.$router.history)
      // $router history push forces a page reload... use window to replace
      // store the searchstring into store?

      if(this.searchString == "") { // empty string = clearing the search! can't ignore 
        // console.log('blank search!')
        this.$router.replace(base)
        return true
      }

      this.$router.replace(url)

      this.$store.dispatch("updateCreate", {
        search: {
          string: this.searchString,
          url: url,
        }
      })
    },
    pathMatch(path) {
      // console.log('pathMatch',this.$router.currentRoute.path)
      if(!this.$router.currentRoute.path)
        return false

      if(this.$router.currentRoute.path == path)
        return true
    },
    toggleNav() {
      if(this.$store.state.navOpen) {
        this.$store.dispatch("updateCreate", {
          navOpen: false
        })
      } else {
        this.$store.dispatch("updateCreate", {
          navOpen: true
        })
      }
    },
    handleNavClick(el) {
      // nav link clicks should trigger nav close
      // console.log('handleNavClick', el.target.href)
      if(el.target.href) {
        this.toggleNav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.logo {
  position: relative;
  width: 45px;
  top: 3px;
}

.logo-xs {
  position: relative;
  width: 45px; //34px;
  // top: 3px;
  // margin-right: 16px;
  vertical-align: bottom;
}

</style>


