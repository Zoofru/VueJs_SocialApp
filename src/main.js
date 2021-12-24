import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
      return {
        user: null
      }
    },
    mutations: {
      setUser (state, user) {
        state.user = user
      }
    },
    actions: {
        async getUser(context) {
            const res = await axios.get(`${import.meta.env.VITE_API}/user/loggedinuser`, {
              headers: { authorization: localStorage.getItem('uId') }
            })
            if(res.data.user) {
                this.commit('setUser', res.data.user)
            }
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
