import { filterEvents, 
         filterEventspast, 
         mayorAsistencia,
         menorAsistencia,
         eventoMayorCapacidad,
         tabla2,
         tabla3} from "../modules/functions.js"

let mayorPorcentaje = document.getElementById('mayorPorcentajeId')
let menorPorcentaje = document.getElementById('menorPorcentajeId')
let mayorCapacidad = document.getElementById('mayorCapacidadId')

let tabla2String = document.getElementById('tabla2Id')
let tabla3String = document.getElementById('tabla3Id')

let urlEventos = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(urlEventos)
.then(response =>response.json())
.then(dataEventos => {

    let arrayEventosPasados = filterEventspast(dataEventos.events)
    let arrayEventosFuturos = filterEvents(dataEventos.events)
    let listaCategorias = [...new Set(arrayEventosFuturos.map( item => item.category ))]
    let listaCategorias2 = [...new Set(arrayEventosPasados.map( item => item.category ))]

    mayorPorcentaje.innerHTML = mayorAsistencia(dataEventos.events)
    menorPorcentaje.innerHTML = menorAsistencia(dataEventos.events)
    mayorCapacidad.innerHTML = eventoMayorCapacidad(dataEventos.events)
   
    tabla2String.innerHTML = tabla2(listaCategorias, arrayEventosFuturos)
    tabla3String.innerHTML = tabla3(listaCategorias2, arrayEventosPasados)


})
.catch((error)=>console.log(error))
//.finally(() => {})




