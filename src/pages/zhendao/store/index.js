import Vue from 'vue'
import Vuex from 'vuex'

// 数据持久化
import Persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)
// 先创建一个对象并进行配置
const vuexPersistedstate = new Persistedstate({
  // strictMode: true,
  storage: localStorage, // 存入localStorage
  reducer: state => ({ // 将状态减少到只需要保存的值。默认情况下，保存整个状态
   
  })
})
export default new Vuex.Store({
  state: {

  },
  getters: {
    
  },
  mutations: {
    
  },
  modules: {
   
  },
  plugins: [vuexPersistedstate]
})

