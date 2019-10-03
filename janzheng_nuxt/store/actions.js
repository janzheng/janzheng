
import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'
// import _ from 'lodash'
import _ from '~/other/lodash.custom.min.js'


export default {
  // async loadCytosis ({ commit, state }, {env, tableQuery, options, caller}) {
  async loadCytosis ({ commit }, {env, tableQuery, options, settings, _key, _base}) {
  // async loadCytosis ({ commit }, {env, tableQuery, options, settings, caller, _key, _base}) {
    const airKey = _key || env.airtable_api
    const airBase = _base || env.airtable_base

    // if(!process.server)
      // console.log(`[actions/loadCytosis loading from:${caller}]: query/options:`, tableQuery, options)
      // console.log(`[actions/loadCytosis loading from:${caller}]: isServer:`, process.server)
    
    // if generated, not server, and static is true
    // we DON'T want to pull data to the client
    // if(env.mode == 'universal' && !process.server && env.site_static) 
    //   return Promise.reject(undefined) // static set to true / don't pull data

    let cytosis = await new Cytosis({
      airKey, 
      airBase, 
      tableQuery, 
      options,
      settings,
    })
    commit('setCytosis', cytosis)

    // if(!process.server)
    // console.log(`[actions/loadCytosis from:${caller}]: done.`)

    return Promise.resolve(cytosis)
  
  },


  // initializes the store
  setElement ({ commit }, el) { // replaces entire object
    commit('setElement', el)
  },
  update ({ commit }, object) {
    // generic mutator action
    // object is: {name: 'stateName', payload: {data} }

    // special rules
    // if updating settings, must clear the data
    // if(object.name == 'settings')
    //   commit('clear', {name: 'data'})

    commit('update', object)
  },
  debouncedUpdate ({ commit }, object) {
    debouncedUpdate(commit, object)
  },
  updateCreate ({ commit }, object) {
    commit('updateCreate', object)
  },
  clear ({ commit }, object) {
    // generic mutator action to clear something
    // console.log('trying to clear', object)
    commit('clear', object)
  },

}

// const emit = function (evtName, data) { // replaces entire dance object
//   window.dispatchEvent( new CustomEvent(evtName, {detail: data}))
// }

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)


