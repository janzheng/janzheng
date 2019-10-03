


// import Vue from 'vue'

let latestPolicy


// export default ({ app, env, store, route }, inject) => {
export default ({app, env, store }, inject) => {

  const policy = {
    getStoredPolicy: () => {
      return localStorage.getItem('pd-policy')
    },
    updateToLatestPolicy: () => {
      // console.log('updateToLatestPolicy', )
      localStorage.setItem('pd-policy', store.state.latestPolicy)
      store.commit('updatePolicyToLatest')
    },
    isLatest: () => {
      // console.log('islatest', store.state.policy, store.state.latestPolicy)
      // returns false if the user hasn't accepted the latest policy
      if(store.state.policy == store.state.latestPolicy) {
        return store.state.policy
      }
      return false
    },
    enablePolicyFeatures: () => {
      if(!(store.state.policy == store.state.latestPolicy))
        return false

      console.log('[Running policy-enhanced features]')
      // console.log('[Policy.js] Enable ga', app, Vue.$ga)
      // Vue.$ga.enable()
      // app.$drift.init()
      // app.$initSegment()
    },
    disablePolicyFeatures: () => {
      // disable if no policy
      // Vue.$ga.disable()
      return true
    }
  }

  // window.onNuxtReady(() => {
  if(!process.server) {
    const storedPolicy = policy.getStoredPolicy()
    // console.log('policy:', browserPolicy, env)
    // handle policy on client. lack of policy will trigger Policy module
    latestPolicy = env.site_policy // get latest official policy from nuxt / the system
    
    // update client to the latest official policy
    store.commit('setPolicy', storedPolicy)
    store.commit('setLatestPolicy', latestPolicy)
    inject('policy', policy)

    // check if latest policy and if it is,
    // we turn on policy-driven things like Google Analytics
    if(policy.isLatest()) {
      policy.enablePolicyFeatures(app)
      // return latestPolicy
    } 
    // no policy exist, so turn off policies
    else {
      policy.disablePolicyFeatures()
    }
    return undefined

  }
}

