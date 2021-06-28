<template>
  <div id="app">
    <div id="nav">
    <img id="logo" alt="logo" src="./assets/logo.png">
      <router-link v-if="!$store.getters.loggedIn" class="btn btn-primary" to="/login">login</router-link>
      <router-link v-if="$store.getters.loggedIn" class="btn btn-primary" to="/home">Inicio</router-link>
      <router-link v-if="$store.getters.loggedIn" class="btn btn-primary" to="/clientes">Gestion Clientes</router-link>
      <router-link v-if="$store.getters.loggedIn" class="btn btn-primary" to="/eventos">Gestion Eventos</router-link>
      <router-link v-if="$store.getters.loggedIn" class="btn btn-primary" to="/logout">{{nombre}} - Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#logo{
  max-width: 50px;
}
.btn{
  margin-left: .5em;
}
#nav {
  padding: 30px;
}

</style>

<script>
export default {
  data(){
    return{
      nombre:localStorage.getItem('usuario'),
    }
  },
};
</script>