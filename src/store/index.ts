import Vue from 'vue'
import Vuex from 'vuex'
import TaskModule from './modules/TaskModule'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    TaskModule
  },
  strict: false
})
