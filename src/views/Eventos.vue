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
          <tr v-for="evento in eventos" :key="evento.id">
            <td>{{ evento.titulo }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.fecha_evento }}</td>
            <td>{{ evento.aforo }}</td>
            <td v-if="evento.vendidas < evento.aforo" class="bg-success">{{ evento.aforo-evento.vendidas }}</td>
            <td v-else class="bg-warning">{{ evento.aforo-evento.vendidas }}</td>
            <td><button class="btn btn-primary">Editar</button>
            <button v-on:click="deleteEvento(evento.id);"  class="btn btn-danger">Eliminar</button></td>
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
              <input type="text" class="form-control" v-model="titulo" placeholder="Desfile 1">
            </div>
            <div class="form-group">
              <label for="descripcion">Descripcion Evento</label>
              <input type="text" class="form-control" v-model="descripcion"  placeholder="de que trata el evento....">
            </div>
            <div class="form-group">
              <label for="capacidad">Capacidad Maxima Evento</label>
              <input type="number" class="form-control" v-model="aforo"  placeholder="10">
            </div>
            <div class="form-group">
              <label for="fecha_evento">Fecha Evento</label>
              <input type="date" class="form-control" v-model="fecha_evento"  placeholder="Desfile 1">
            </div>
            <button  v-on:click="crearEvento();"  class="btn btn-primary">Guardar</button>
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
      vendidas: 0,
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
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
          headers:this.headers
        })
        .then(response => { 
              this.eventos = response['data'].data;
          })
        .catch(response => {
            console.log(response)
        });
    },
    deleteEvento($id) {
      axios.delete('/api/eventos/'+$id,
        {
          headers:this.headers
        })
        .then(response => { 
            this.getEventos()
            console.log(response)
          })
        .catch(response => {
            console.log(response)
        });
    },
    crearEvento(){
      axios.post('/api/eventos',{
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha_evento: this.fecha_evento,
        aforo: this.aforo,
        vendidas: 0},
        {
          headers: this.headers
        })
        .then(response => { 
          this.eventos.push(response.data.data)
              console.log(response)
          })
        .catch(response => {
            console.log(response)
        });
    }
  }
}
</script>
