import {imprimirCartaDetails} from '../modules/functions.js'

const contenedorDetails = document.getElementById("cartaDetails")

fetch('https://mindhub-xj03.onrender.com/api/amazing')

    .then(response =>{
        return response.json()})
    .then(dataEventos => {
        const parametro = location.search
        const params = new URLSearchParams(parametro)

        let idEvento = params.get("parametro")
        console.log(idEvento)

        
        const evento2 = dataEventos.events.find(evento => evento._id== idEvento)
        
        imprimirCartaDetails(contenedorDetails, evento2)
    })
    .catch(err => console.log(err))
