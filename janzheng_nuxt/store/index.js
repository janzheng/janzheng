
// import Vuex from 'vuex'
// import _ from 'lodash'

import vuexCache from 'vuex-cache'

import _state from './state.js'
import _getters from './getters.js'
import _mutations from './mutations.js'
import _actions from './actions.js'

export const state = () => (_state) // state is a function
export const getters = _getters
export const mutations = _mutations
export const actions = _actions
export const plugins = [vuexCache]

// export const actions = {
//   async nuxtServerInit ({ commit }, context) {
//     await userAgent(context)
//     // here my context is updated :)
//   }
// }

// const createStore = () => {
//   return new Vuex.Store({
//     state,
//     mutations,
//     getters,
//     actions,
//     plugins: [vuexCache],
//   })
// }

// export default createStore
