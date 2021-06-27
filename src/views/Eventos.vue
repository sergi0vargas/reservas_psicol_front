<template>
  <div class="container">
    <h1>Listado de eventos</h1>
      <div class="row">
        <table class="table ">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha</th>
            <th scope="col">Capacidad max</th>
            <th scope="col">Capacidad disponible</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evento,index) in eventos" :key="index">
            <td>{{ evento.titulo }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.fecha_evento }}</td>
            <td>{{ evento.aforo }}</td>
            <td v-if="evento.vendidas < evento.aforo" class="bg-success">{{ evento.vendidas }}</td>
            <td v-else class="bg-warning">{{ evento.vendidas }}</td>
            <td><button class="btn btn-primary">Editar</button>
            <button v-on:click="deleteEvento(index);"  class="btn btn-danger">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="row">
        <div class="col-4">
          <h3>Nuevo Evento</h3>
          <form>
            <div class="form-group">
              <label for="titulo">Titulo Evento</label>
              <input type="text" class="form-control" v-bind="titulo" placeholder="Desfile 1">
            </div>
            <div class="form-group">
              <label for="descripcion">Descripcion Evento</label>
              <input type="text" class="form-control" v-bind="descripcion"  placeholder="de que trata el evento....">
            </div>
            <div class="form-group">
              <label for="capacidad">Capacidad Maxima Evento</label>
              <input type="number" class="form-control" v-bind="aforo"  placeholder="10">
            </div>
            <div class="form-group">
              <label for="fecha_evento">Fecha Evento</label>
              <input type="date" class="form-control" v-bind="fecha_evento"  placeholder="Desfile 1">
            </div>
            <button  v-on:click="crearEvento(index);"  class="btn btn-primary">Guardar</button>
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
      eventos:[],
      titulo: null,
      descripcion: null,
      fecha_evento: null,
      aforo: null,
      vendidas: 0
    }
  },
  created () {
    this.getEventos();
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
    deleteEvento($id) {
      console.log($id)
    },
    crearEvento(){
      axios.post('/api/eventos',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          },
          titulo: this.titulo,
          descripcion: this.descripcion,
          fecha_evento: this.fecha_evento,
          aforo: this.aforo,
          vendidas: 0
        })
        .then(response => { 
              console.log(response)
          })
        .catch(response => {
            console.log(response)
        });
    }
  }
}
</script>
