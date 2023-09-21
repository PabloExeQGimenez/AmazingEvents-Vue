const { createApp } = Vue

  createApp({
    
    data() {
      return {
        eventos:[],
        eventosPasados: [],
        message: 'Hello Vue!',
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

        this.eventosPasados = this.filterEventspast(this.eventos)
        console.log(this.eventosPasados)
        this.filtrados = this.eventosPasados
        console.log(this.filtrados)

        
    })
    
    .catch(err => console.log(err))
    },

    methods:{
        filterEventspast (listaEventos){
            let aux = []
            for (let evento of listaEventos){
                if (evento.date.startsWith("2022") || evento.date.startsWith("2021") || evento.date.startsWith("2019")==true){
                aux.push(evento)
            }
           } return aux
        }, 

        buscar(eventos, inputSearch){
            return eventos.filter(evento => evento.name.toLowerCase().includes(inputSearch))
        },


        filtrarChecks (eventos, checkeados){
            if (checkeados.length == 0){
                return eventosPasados
            }
            
            return eventos.filter(evento => checkeados.includes(evento.category))


        },

        filtrosCruzados(){
            const filtradosPorBuscar = this.buscar(this.eventosPasados, this.inputSearch)
            const filtradosPorChecks = this.filtrarChecks(filtradosPorBuscar, this.checkeados)
            this.filtrados = filtradosPorChecks
        }

        


    }

    
  }).mount('#app')
