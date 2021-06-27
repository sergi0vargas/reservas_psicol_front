<template>
  <div class="home">
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-md-4">
        <h1>Gestion de Boletas</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2>Listado de eventos</h2>
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Titulo</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Capacidad max</th>
                  <th scope="col">Capacidad disponible</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="evento in eventos" :key="evento.id">
                  <td>{{ evento.titulo }}</td>
                  <td>{{ evento.descripcion }}</td>
                  <td>{{ evento.fecha_evento }}</td>
                  <td>{{ evento.aforo }}</td>
                  <td>{{ evento.vendidas }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h2> Listado de Clientes</h2>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Documento</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Direccion</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cliente in clientes" :key="cliente.documento">
                  <td>{{ cliente.documento }}</td>
                  <td>{{ cliente.nombre }}</td>
                  <td>{{ cliente.correo }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>{{ cliente.direccion }}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      eventos:[],
      clientes:[],
    }
  },
  created () {
    this.getEventos();
    this.getClientes();
  },
  components: {
    
  },
  methods: {
    getEventos() {
      axios.get('/api/eventos',{
          headers: {
             Authorization: 'Bearer ' + localStorage.getItem('access_token')
           }
        })
        .then(response => { 
              this.eventos = response['data'].data;
          })
        .catch(response => {
            console.log(response)
        });
    },
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
    }
  }
}
</script>
