const { createApp } = Vue

  createApp({
    
    data() {
      return {
        eventos:[],
        eventosFuturos: [],
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
        this.eventos = dataEventos.events 
        this.eventosFuturos = this.filterEvents(this.eventos)
        this.filtrados = this.eventosFuturos

        
    })
    
    .catch(err => console.log(err))
    },

    methods:{
        filterEvents (listaEventos){
            let aux = []
            for (let evento of listaEventos){
                if (evento.date.startsWith("2023") || evento.date.startsWith("2024")==true){
                aux.push(evento)
            }
           } return aux
        },

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
            const filtradosPorBuscar = this.buscar(this.eventosFuturos, this.inputSearch)
            const filtradosPorChecks = this.filtrarChecks(filtradosPorBuscar, this.checkeados)
            this.filtrados = filtradosPorChecks
        }

        


    }

    
  }).mount('#app')