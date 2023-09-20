 import { 
     crearEstructuraCartaspastup,
     estructuraChecks,
     imprimirChecks,
     imprimirCartaspast,
     filtrarChecks,
     buscar,
     filtrosCruzados,
     filterEventspast
         } from '../modules/functions.js'

const contenedorcategorias = document.getElementById("contenedorcategoriaspast")
const buscador = document.getElementById("buscadorpast");
const btnbuscador = document.getElementById("btnbuscadorpast");
const resultados = document.getElementById("resultadospast");

const contenedorCartas = document.getElementById("contenedorCartaspast")


fetch('https://mindhub-xj03.onrender.com/api/amazing')

    .then(response =>{
        console.log(response)
        return response.json()})
    .then(dataEventos => {
      let listaEventos = dataEventos.events
     
      let pastEvents = filterEventspast(listaEventos)

        console.log(pastEvents)

        const setcategorias = new Set(pastEvents.map(item => item.category))
        const arraycategorias = Array.from(setcategorias)

        imprimirChecks(contenedorcategorias, arraycategorias)
        imprimirCartaspast(pastEvents, contenedorCartas)

        btnbuscador.addEventListener("click", ()=>{
            const arrayFiltrosCruzdos = filtrosCruzados (pastEvents, buscador)
            imprimirCartaspast(arrayFiltrosCruzdos, contenedorCartas)
        })
        contenedorcategorias.addEventListener("change", ()=>{
 
            const arrayFiltrosCruzdos = filtrosCruzados (pastEvents, buscador)
            console.log(arrayFiltrosCruzdos)
            imprimirCartaspast(arrayFiltrosCruzdos, contenedorCartas)

        })
                    })
    .catch(err => console.log(err))

const arrayCategoriasRepetidas = pastEvents.map((categoriasRepetidas) => categoriasRepetidas.category)
const setcategorias = new Set(arrayCategoriasRepetidas)
const categorias = Array.from(setcategorias)





