
// import _ from 'lodash'
import _ from '~/other/lodash.custom.min.js'

export default { 

  setElement (state, el) {
    state.element = el
  },
  // generalized mutator for changing store
  // update (state, {name, payload}) {
  update (state, payload) {
    // takes: {stateName: payloadobject}
    // _this.$store.dispatch('update', { "enums.OVERFLOW": value})
    // future (multiple):  [{stateName: payloadobject}, {stateName: payloadobject})
    // console.log('mutate update')

    if ( !!payload && payload.length) {
      for (let n of payload) {
        // type 2: array of key/val pairs
        const name = Object.keys(payload)[n][0]
        const value = Object.values(payload)[n][0]

        // debug('Store.update', 'Updating:', name, payload, state)
        if(state[name] !== undefined) {
          state[name] = value
        } else {
          // console.log('Store update failed; object doesn’t exist for', name, state)
          console.error('Store.update', 'Failed: object doesn’t exist:', name, value, state)
        }
      }
    } else {
      const name = Object.keys(payload)[0]
      const value = Object.values(payload)[0]

      // type 2: name is "fruit.orange" we only want to edit the orange
      if(name.indexOf('.') > 0) {
        let substate = state
        let nameList = name.split('.')
        nameList.map((o) => {
          if(typeof(substate[o]) == 'object') {
            // console.log('popopopo')
            substate = substate[o]
          } else if(typeof(substate[o]) == 'undefined'){
            // console.log('wawawawa')
            substate[o] = {}
          }
        })
        substate[nameList[nameList.length-1]] = value

        // console.log('new state:', substate, state)
        return true
      }
      // type 1: only one key/val pair — this enforces checking for existence
      // replaces the whole object

      // debug('Store.update', 'Updating:', name, payload, state)
      if(state[name] !== undefined) {
        state[name] = value
      }
      else
        // console.log('Store update failed; object doesn’t exist for', name, state)
        console.error('Store.update', 'Failed: object doesn’t exist:', name, value, state)
    }
  },
  
  // generalized mutator for creating or updating new value
  updateCreate (state, payload) {
    // like update, but creates the object at location if it doesn't exist
    // basically like create w/o the checker
    // USE THIS SPARINGLY, most likely a state obj doesn't exist b/c of typo or race condition
    // if(!silent)
    // debug('Store.updateCreate', 'Creating', payload, state)
    // console.log('UPDATECREATE', payload)

    // iterator 
    Object.keys(payload).map((name) => {
      // const value = Object.values(payload)[0]
      // preserve things like functions, not just data w/ object.create
      state[name] = payload[name]
    })

    // single object
    // const name = Object.keys(payload)[0]
    // const value = Object.values(payload)[0]
    // state[name] = value
  },
  // clear (or reset) an object (esp. used on update)
  clear (state, name) {
    // console.log('Store.clear', 'Clearing:', name)
    if(state[name] !== undefined) {
      // state[name] = undefined
      delete state[name]
    }
    // else
      // console.log('Store clear failed; object doesn’t exist for', name)
      // console.error('Store.clear', 'Store clear failed; object doesn’t exist for', name)
  },


  // specifically overwrites the cytosis object
  // setCytosis (state, cytosis) {
  //   state['cytosis'] = cytosis
  // },

  setCytosis (state, cytosis) {
    // this takes up a lot of space; don't save cytosis objects in store anymore
    // but stil generate all the tables into the store

    // use the latest cytosis object, but combine all tables
    // cytosis.tables is actually an object of all the tables, w/ each table name as keys
    // console.log('setCyt before:', cytosis.tables)

    // clean up the cytosis table by only keeping id and fields
    let cleanTable = {}
    Object.keys(cytosis.tables).map(key => {
      // console.log('cleantable:', key)
      const cleanData = cytosis.tables[key].map(entry => {
        // console.log('cleanData . entry', entry)
        return {
          fields: entry.fields,
          id: entry.id
        }
      })
      // console.log('cleanData', cleanData)
      cleanTable[key] = cleanData
    })

    // console.log('cleanTable', cleanTable)

    // const aggregateTables = {...state.cytosis.tables, ...cytosis.tables}
    // const aggregateTables = {...state.cytosis.tables, ...cleanTable}
    // console.log('setCyt aggregate:', aggregateTables)

    // cleanTable = aggregateTables
    // console.log('aggregateTables:', aggregateTables)
    // cytosis.tables = Object.keys(aggregateTables).map(table => {
    //   console.log('agg table:', table)
    //   return {
    //     fields: table.fields,
    //     id: table.id
    //   }
    // })

    // this takes up massive space; commented out
    // state.cytosis = _.cloneDeep(cytosis)

    // spread each tables into state so mapstate can use them
    // state = {
    //   ... state,
    //   ... cytosis.tables
    // }
    for (let key of Object.keys(cleanTable)) {
      // console.log('merge: ', cleanTable)
      let aggregate = []
      if(state[key]) {
        aggregate = _.union(cleanTable[key], state[key]) //[ ... cleanTable[key], ... state[key]]
      }
      else
        aggregate = cleanTable[key]

      aggregate = _.uniqBy(aggregate, 'id')

      // console.log('agg:', key, aggregate)
      state[key] = aggregate
    }
    // console.log('setCyt after:', state.cytosis.find)
  },

  // track policy accepted or not, from Policy.vue
  
  updatePolicyToLatest (state) {
    state['policy'] = state['latestPolicy']
  },
  setPolicy (state, el) {
    state['policy'] = el
  },
  setLatestPolicy (state, el) {
    state['latestPolicy'] = el
  }
}
