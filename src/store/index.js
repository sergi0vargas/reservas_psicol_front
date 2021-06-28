import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    usuario: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token,nombre) {
      state.token = token
      state.usuario = nombre
    },
    destroyToken(state) {
      state.token = null
      state.usuario = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/api/login', {
          email: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.data.token
            const nombre = response.data.data.name
            //console.log(response.data.data)
            localStorage.setItem('access_token', token)
            localStorage.setItem('usuario', nombre)
            context.commit('retrieveToken', token,nombre)

            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
      })

    },
    destroyToken(context) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("usuario");
        context.commit("destroyToken", null);
        router.push({ name: 'login' });
    }
  }
})

export default store