<template>
  <div id="app">
    <div id="nav">
    <img id="logo" alt="logo" src="./assets/logo.png">
      <router-link class="btn btn-primary" to="/login">login</router-link>
      <router-link  class="btn btn-primary" to="/home">Inicio</router-link>
      <router-link  class="btn btn-primary" to="/clientes">Gestion Clientes</router-link>
      <router-link  class="btn btn-primary" to="/eventos">Gestion Eventos</router-link>
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
