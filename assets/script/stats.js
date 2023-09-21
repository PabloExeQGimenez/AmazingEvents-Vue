const { createApp } = Vue

  createApp({
    
    data() {
      return {
        eventos: [],
        arraycategorias: [],
        inputSearch:"",
        filtrados:[],
        inputChecks:"",
        checkeados: [],
        porcentajeMayor:"",
        nombreMayorAsistencia: '',
        porcentajeMayorAsistencia: 0,
        nombreMenorAsistencia: '',
        porcentajeMenorAsistencia: 0,
        nombreMayorCapacidad: '',
        mayorCapacidad: 0,
        items:[],
        ganancias:[],
        porcentajes:[],
        listaCategorias:[],
        listaEventos:[],
        arrayEventosFuturos:[],
        listaCategoriasfuturas:[],
        tablaDatos:[],
        arrayEventosPasados:[],
        listaCategoriasPasadas:[],
        tablaDatosPasados:[]
        
        
       
        
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
        this.filtrados = this.eventos
        
        this.mayorAsistencia(this.eventos)
        this.menorAsistencia(this.eventos)
        this.eventoMayorCapacidad(this.eventos)
        
        

    
        this.arrayEventosFuturos = this.filterEvents(this.eventos)
        console.log(this.arrayEventosFuturos)
        this.listaCategoriasfuturas = [...new Set(this.arrayEventosFuturos.map( item => item.category ))]
        this.tabla2(this.listaCategoriasfuturas, this.arrayEventosFuturos )
       
        this.arrayEventosPasados = this.filterEventspast(this.eventos)
        this.listaCategoriasPasadas = [...new Set(this.arrayEventosPasados.map( item => item.category ))]
        this.tabla3(this.listaCategoriasPasadas, this.arrayEventosPasados)

        
    })
    
    .catch(err => console.log(err))
    },

    methods:{

        mayorAsistencia(eventos) {
            let resultadoPorcentajeMayor = 1
            let aforoMayor;
            eventos.forEach((item) => {
              let calculoAux = (item.assistance * 100) / item.capacity
              if (calculoAux > resultadoPorcentajeMayor) {
                resultadoPorcentajeMayor = calculoAux;
                aforoMayor = item;
              }
            })
            this.nombreMayorAsistencia = aforoMayor.name;
            this.porcentajeMayorAsistencia = resultadoPorcentajeMayor.toFixed(2)
          },

          menorAsistencia (data){
            let resultadoPorcentajeMenor = 100
            let aforoMenor
            data.forEach(item => {
                let calculoAux = (item.assistance*100)/item.capacity
                if (calculoAux < resultadoPorcentajeMenor){
                    resultadoPorcentajeMenor=calculoAux 
                    aforoMenor = item
                }})
                this.nombreMenorAsistencia = aforoMenor.name
                this.porcentajeMenorAsistencia = resultadoPorcentajeMenor.toFixed(2)
        },

        eventoMayorCapacidad (data){
            let capacidad = 1
            let eventoMayorCapacidad
            data.forEach(item => {
                item.capacity
                if (item.capacity > capacidad){
                    capacidad = item.capacity
                    eventoMayorCapacidad = item.name
                }})
                this.nombreMayorCapacidad = eventoMayorCapacidad
                this.mayorCapacidad = capacidad
        },

        filterEvents (listaEventos){
            let aux = []
            for (let evento of listaEventos){
                if (evento.date.startsWith("2023") || evento.date.startsWith("2024")==true){
                aux.push(evento)
            }
           } return aux
        },
        
        tabla2 (categorias, eventosfuturos ){
                    let tablaDatos=[]
        
                    categorias.forEach(item => {
                    let eventoporCategoria = eventosfuturos.filter(item2 => item2.category==item)
        
                    let ganancia = 0
                    let porcentaje = 0
                    eventoporCategoria.forEach(e => {
                    ganancia += (e.estimate * e.price)
                    porcentaje += (e.estimate * 100 / e.capacity)/(eventoporCategoria.length)
                    })
                    tablaDatos.push({
                        item,
                        ganancia,
                        porcentaje: porcentaje.toFixed(2),
                      });
                    
                
             })
             this.tablaDatos = tablaDatos    
              
         },

         filterEventspast (listaEventos){
            let aux = []
            for (let evento of listaEventos){
                if (evento.date.startsWith("2022") || evento.date.startsWith("2021") || evento.date.startsWith("2019")==true){
                aux.push(evento)
            }
           } return aux
        }, 

         tabla3(categorias, eventospasados){
            let tablaDatosPasados = []

            categorias.forEach(item => {
                let eventoporCategoria = eventospasados.filter(item2 => item2.category == item)
        
                let ganancia = 0
                let porcentaje = 0
                eventoporCategoria.forEach(e => {
                    ganancia += (e.assistance * e.price)
                    porcentaje += (e.assistance * 100 / e.capacity)/(eventoporCategoria.length)
                })
                tablaDatosPasados.push({
                    item,
                    ganancia,
                    porcentaje: porcentaje.toFixed(2),
                  });
            })
            this.tablaDatosPasados = tablaDatosPasados    

        }
}

    

   
  }).mount('#app')



