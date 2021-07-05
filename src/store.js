import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      rows: [],
  },
  getters: {
    getRows: (state) => (email, group) => {
        return state.rows.filter(row => row.email == email, row => row.group == group)
    },
    rows: state=> {
        let result = []
        state.rows.forEach(function(v) {
            console.log(v)
            result.push({
                "full_name": v.full_name,
                "email": v.email,
                "group": v.group
            })
        })
        return result
    },
    unique: (state) => (full_name) => {
        let result = state.rows.find(row => row.full_name == full_name)
        return result
    },
  },
  mutations: {
    addRows  (state, payload) {
        console.log(payload)
        state.rows.push(payload)
      }
  }
})