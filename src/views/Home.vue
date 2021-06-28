<template>
  <div class="home">
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-md-8">
        <h1>Gestion de Boletas</h1>
        <p>Da clic en algun evento y algun clientes para activar la venta de boletas</p>
        <button v-if="documentoAVender != null && eventoAVender!=null" v-on:click="VenderEntrada();" class="btn btn-danger">VENDER ENTRADA</button>
        <p v-if="documentoAVender != null && eventoAVender!=null">la venta sera del evento {{eventoAVender}} para el cliente con documento {{documentoAVender}}</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2>Listado de eventos</h2>
          <div>
            <table class="table table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Capacidad max</th>
                  <th scope="col">Capacidad disponible</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="evento in eventos" :key="evento.id" @click="selectEvento(evento.id)">
                  <td v-if="evento.id == eventoAVender"  class="table-success">{{ evento.id }}</td>
                  <td  v-else>{{ evento.id }}</td>
                  <td>{{ evento.titulo }}</td>
                  <td>{{ evento.descripcion }}</td>
                  <td>{{ evento.fecha_evento }}</td>
                  <td>{{ evento.aforo }}</td>
                  <td>{{ evento.aforo-evento.vendidas }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h2> Listado de Clientes</h2>
            <table class="table table-hover">
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
                <tr v-for="cliente in clientes" :key="cliente.documento" @click="selectCliente(cliente.documento)">
                  <td  v-if="cliente.documento == documentoAVender"  class="table-success">{{ cliente.documento }}</td>
                  <td  v-else>{{ cliente.documento }}</td>
                  <td>{{ cliente.nombre }}</td>
                  <td>{{ cliente.correo }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>{{ cliente.direccion }}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div class="row">
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
      documentoAVender:null,
      eventoAVender:null,
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
    },
    selectEvento($id){
      if(this.eventoAVender == null || this.eventoAVender!=$id)
        this.eventoAVender = $id;
        else
        this.eventoAVender = null
    },
    selectCliente($documento){
      if(this.documentoAVender == null || this.documentoAVender != $documento)
        this.documentoAVender = $documento;
        else
        this.documentoAVender = null
    },
    VenderEntrada() {
      axios.put('/api/clientes/vender?c='+this.documentoAVender+'&e='+this.eventoAVender,null,{
          headers: {
             Authorization: 'Bearer ' + localStorage.getItem('access_token')
           }
        })
        .then(response => { 
          this.getEventos();
          console.log(response)
          })
        .catch(response => {
          console.log(response)
        });
    }
  }
}
</script>
