import { 
    crearEstructuraCartaspastup,
    estructuraChecks,
    imprimirChecks,
    imprimirCartasup,
    filtrarChecks,
    buscar,
    filtrosCruzados,
    filterEvents
        } from '../modules/functions.js'

const contenedorcategorias = document.getElementById("contenedorcategoriasupc")
const buscador = document.getElementById("buscadorupc");
const btnbuscador = document.getElementById("btnbuscadorupc");
const resultados = document.getElementById("resultadosupc");
const contenedorCartas = document.getElementById("contenedorCartasupc")

fetch('https://mindhub-xj03.onrender.com/api/amazing')

    .then(response =>{
        return response.json()})
    .then(dataEventos => {
      let listaEventos = dataEventos.events
      let upcomingEvents = filterEvents(listaEventos)
        const setcategorias = new Set(upcomingEvents.map(item => item.category))
        const arraycategorias = Array.from(setcategorias)
        imprimirChecks(contenedorcategorias, arraycategorias)
        imprimirCartasup(upcomingEvents, contenedorCartas)
        btnbuscador.addEventListener("click", ()=>{
            const arrayFiltrosCruzdos = filtrosCruzados (upcomingEvents, buscador)
            imprimirCartasup(arrayFiltrosCruzdos, contenedorCartas)
        })
        contenedorcategorias.addEventListener("change", ()=>{
            const arrayFiltrosCruzdos = filtrosCruzados (upcomingEvents, buscador)
            console.log(arrayFiltrosCruzdos)
            imprimirCartasup(arrayFiltrosCruzdos, contenedorCartas)
        })
    })
    .catch(err => console.log(err))

const arrayCategoriasRepetidas = upcomingEvents.map((categoriasRepetidas) => categoriasRepetidas.category)
const setcategorias = new Set(arrayCategoriasRepetidas)
const categorias = Array.from(setcategorias)

