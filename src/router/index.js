import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Home from '../views/Home.vue'
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
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
        requiresAuth: true,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Eventos,
    meta: {
      requiresAuth: true,
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
