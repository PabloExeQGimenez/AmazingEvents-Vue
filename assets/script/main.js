const { createApp } = Vue

  createApp({
    
    data() {
      return {
        eventos: [],
        arraycategorias: [],
        inputSearch:"",
        filtrados:[],
        inputChecks:"",
        checkeados: []
        
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')

    .then(response =>{
        return response.json()})
    .then(dataEventos => {
        const setcategorias = new Set(dataEventos.events.map(item => item.category))
        this.arraycategorias = Array.from(setcategorias)
        console.log(this.arraycategorias)
        this.eventos = dataEventos.events 
        this.filtrados = this.eventos
        
    })
    
    .catch(err => console.log(err))
    },

    methods:{

        buscar(eventos, inputSearch){
            return eventos.filter(evento => evento.name.toLowerCase().includes(inputSearch))
        },


        filtrarChecks (eventos, checkeados){
            if (checkeados.length == 0){
                return eventos
            }
            
            return eventos.filter(evento => checkeados.includes(evento.category))


        },

        filtrosCruzados(){
            const filtradosPorBuscar = this.buscar(this.eventos, this.inputSearch)
            const filtradosPorChecks = this.filtrarChecks(filtradosPorBuscar, this.checkeados)
            this.filtrados = filtradosPorChecks
        }


    },

    computed:{
       

        

       

    }

  }).mount('#app')