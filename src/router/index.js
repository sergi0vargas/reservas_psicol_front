import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Clientes from '../views/Clientes.vue'
import Eventos from '../views/Eventos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Eventos
  }
]

const router = new VueRouter({
  routes
})

export default router
