<template>
  <div class="clientes container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <h2> Listado de Clientes</h2>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Documento</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.documento">
                <td>{{ cliente.documento }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.correo }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
                <td><button class="btn btn-primary">Editar</button>
                <button v-on:click="deleteCliente(cliente.documento);"  class="btn btn-danger">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <h3>Nuevo Cliente</h3>
        <form>
          <div class="form-group">
            <label for="titulo">Documento</label>
            <input type="text" class="form-control" v-model="documento" placeholder="132456">
          </div>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" v-model="nombre"  placeholder="pepito perez....">
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input type="email" class="form-control" v-model="correo"  placeholder="">
          </div>
          <div class="form-group">
            <label for="telefono">Telefono</label>
            <input type="text" class="form-control" v-model="telefono"  placeholder="">
          </div>
          <div class="form-group">
            <label for="direccion">Direccion</label>
            <input type="text" class="form-control" v-model="direccion"  placeholder="">
          </div>
          <button  v-on:click="crearCliente();"  class="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      clientes:[],
      documento: null,
      nombre: null,
      correo: null,
      telefono: null,
      direccion: null
    }
  },
  created () {
    this.getClientes();
  },
  components: {
    
  },
  methods: {
    getClientes() {
      axios.get('/api/clientes',{
          headers: {
             Authorization: 'Bearer ' + localStorage.getItem('access_token')
           }
        })
        .then(response => { 
              this.clientes = response['data'].data;
          })
        .catch(response => {
            console.log(response)
        });
    },
    deleteCliente($id) {
      axios.delete('/api/clientes/'+$id,
        {
          headers:this.headers
        })
        .then(response => { 
            this.getClientes()
            console.log(response)
          })
        .catch(response => {
            console.log(response)
        });
    },
    crearCliente(){
      axios.post('/api/clientes',{
        documento: this.documento,
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        direccion: this.direccion},
        {
          headers: this.headers
        })
        .then(response => { 
          this.clientes.push(response.data.data)
              console.log(response)
          })
        .catch(response => {
            console.log(response)
        });
    }
  }
}
</script>
