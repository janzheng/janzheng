
/*

  Should be run on every page load
  - Manages the inter-page search string
  - Manages Phage Directory data (hydrates the db @ SSR and redirect)

*/

// import _ from 'lodash'

import {loadQuery} from '~/other/loaders'
// import {loadStatic, loadDynamic, loadNews} from '~/other/loaders'

// async function loadData(routeName, store, env) {
//   // Load static data
//   // await store.dispatch('loadCytosis', {
//   //   env,
//   //   tableQuery: 'static',
//   // })

//   // if universal mode, don't load data when not server
//   // if(process.mode == 'universal' && !process.server)
//   //   return false;

//   // console.log('loading cytosis. Data:', `Content:${!!store.state.Content}, Orgs:${!!store.state.Organizations}`)
//   // if(process.server) {
//   // checks to prevent over-eager fetching?
//   // let staticData, dynamicData, newsData
//   let staticData, dynamicData

//   staticData = loadStatic(env, store, routeName)
//   dynamicData = loadDynamic(env, store, routeName)

//   return Promise.all([staticData, dynamicData])
// }


async function loadQueryData(routeName, store, env, tableQuery, keyword) {
  let data
  data = await loadQuery({env, store, routeName, query: tableQuery, keyword})
  // console.log('[loadQueryData] data', data)

  return Promise.all([data])
}

export default async function ({route, env, store}) {

  const routeName = route.name || route.path

  // if(routeName != 'phages' && routeName != 'labs') {
  // // console.log('clear search.');
  //   store.dispatch('update', 
  //     {
  //       searchString: '',
  //       searchUrl: '',
  //     }
  //   )
  // }

  // add the external handler to store
  if(!store.state.ext_handler || store.state.ext_handler == '') {
    store.commit('update', {ext_handler: env.ext_handler})
  }

  // specific data requests can be set through meta: in page pages/templates, to reduce server load
  let tableQuery, tableQueries, keyword, refreshOnLoad
  route.meta.map((meta) => {
    tableQuery = meta.tableQuery
    tableQueries = meta.tableQueries
    refreshOnLoad = meta.refreshOnLoad
    keyword = route.params.slug // used to match keyword by field
  })[0]

  if(refreshOnLoad) {
    // console.log('refresh — clear out the store', tableQuery, tableQueries)
    // store.cache.delete('loadCytosis')
    store.dispatch('clear', "Atoms")
  }

  // nuxt expects a promise for async middleware
  // const data = await loadDataOnServer()

  // if (process.server) {
  //   console.log('Server Pageload:', routeName, `[server:${process.server} / client:${process.client} / static:${process.static}]`)
  //   return loadServerData(routeName, store, env)
  // }
  // else {
  if (tableQuery) {
    // console.log('[pageload] table query', tableQuery)
    // loads data from airtable based on a partial query
    return loadQueryData(routeName, store, env, tableQuery, keyword)
  } else if (tableQueries) {
    // in this case, we have multiple linked queries in airtable
    const getData = async function() {
      // console.log('tableQueries... ', tableQueries)
      let queryData = tableQueries.map( (query) => {
        return loadQueryData(routeName, store, env, query, keyword)
      })
      return Promise.all(queryData)
    }

    const data = await getData()
    // console.log('finally', data.flat(2))
    return data
  }
  console.error("Don't forget to set a query to load from for pageload ")
  // } else {
  //   return loadData(routeName, store, env)
  // }
}
// }



