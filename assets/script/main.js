import {filtrarChecks,
        crearEstructuraCartas,
        estructuraChecks,
        imprimirChecks,
        imprimirCartas,
        filtrosCruzados,
        buscar} from '../modules/functions.js'

const contenedorcategorias = document.getElementById("contenedorcategorias")
const buscador = document.getElementById("buscador");
const btnbuscador = document.getElementById("btnbuscador");
const resultados = document.getElementById("resultados");
const contenedorCartas = document.getElementById("contenedorCartas")

fetch('https://mindhub-xj03.onrender.com/api/amazing')

    .then(response =>{
        return response.json()})
    .then(dataEventos => {
        const setcategorias = new Set(dataEventos.events.map(item => item.category))
        const arraycategorias = Array.from(setcategorias)
        imprimirChecks(contenedorcategorias, arraycategorias)
        imprimirCartas(dataEventos.events, contenedorCartas)
        btnbuscador.addEventListener("click", ()=>{
            const arrayFiltrosCruzdos = filtrosCruzados (dataEventos.events, buscador)
            imprimirCartas(arrayFiltrosCruzdos, contenedorCartas)
        })
        contenedorcategorias.addEventListener("change", ()=>{
            const arrayFiltrosCruzdos = filtrosCruzados (dataEventos.events, buscador)
            console.log(arrayFiltrosCruzdos)
            imprimirCartas(arrayFiltrosCruzdos, contenedorCartas)
        })
    })
    .catch(err => console.log(err))