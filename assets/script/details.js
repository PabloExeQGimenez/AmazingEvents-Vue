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

function imprimirCartaDetails(contenedor, evento) {
    contenedor.innerHTML += `
    <div class="card2">
    <img src="${evento.image}" class="card-img-top img-fluid" alt="${evento.image}">
    <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><small class="text-muted">Date: ${evento.date}</small></li>
        <li class="list-group-item"><small class="text-muted">Place: ${evento.place}</small></li>
        <li class="list-group-item"><small class="text-muted">Assistance: ${evento.assistance}</small></li>
        <li class="list-group-item"><small class="text-muted">Capacity: ${evento.capacity}</small></li>
        <li class="list-group-item"><small class="text-muted">Category: ${evento.category}</small></li>
    </ul>
    <div class="card-body">
        <p class="card-text"><small class="text-success">Price: U$D ${evento.price}</small></p>
    </div>
</div>

`               
}
