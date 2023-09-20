export function estructuraChecks (categoria){
    return `<div class="cajita">
                <div class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="${categoria}"/>${categoria}
                    </label>
                </div>
            </div>`
}

export function imprimirChecks (referenciahtml,arraycategorias){
    let estructuratodaslasChecks = ""
    for (let categoria of arraycategorias) {
        estructuratodaslasChecks += estructuraChecks(categoria) 
    }
    referenciahtml.innerHTML = estructuratodaslasChecks
}

export function crearEstructuraCartas (evento){
    return `<div class="card h-100 mx-auto">
    <img src="${evento.image}" class="card-img-top img-fluid" alt="${evento.name}">
    <div class="card-body">
      <h5 class="card-title text-center">${evento.name}</h5>
      <p class="card-text text-center">${evento.description}</p>
      <hr>
      <div class=" d-flex justify-content-evenly">
        <p class="card-text precio">$ ${evento.price}</p>
        <p class="card-text ancor"><a class="ancor"
            href="./assets/pages/details.html?parametro=${evento._id}">Details</a></p>
      </div>
    </div>
    </div>`
}

export function imprimirCartas(array, referenciahtml2){
    let estructura = ""
    for (const evento of array) {    
        estructura += crearEstructuraCartas(evento)
    }
    referenciahtml2.innerHTML = estructura 
}

export function filtrarChecks (array){
    const nodelistachecks = document.querySelectorAll("input[type='checkbox']:checked")
    const arrayChecks = Array.from(nodelistachecks)
    const arrayValores =  arrayChecks.map(input=> input.value)
    const eventosFiltradosChecks = array.filter(objeto => arrayValores.includes(objeto.category))
    return eventosFiltradosChecks
}

export function buscar(array, inputbuscador) {
    const terminoBusqueda = inputbuscador.value.toLowerCase()
    // resultados.innerHTML = ""
    const eventosFiltrados = array.filter(evento => evento.name.toLowerCase().includes(terminoBusqueda))

    return eventosFiltrados
}

export function filtrosCruzados (array, buscador){
    const arrayFiltradosPorChecks = filtrarChecks(array)
    const arrayFiltradosPorBuscador = buscar(arrayFiltradosPorChecks, buscador)
    return arrayFiltradosPorBuscador
}

export function filterEvents (listaEventos){
    let aux = []
    for (let evento of listaEventos){
        if (evento.date.startsWith("2023") || evento.date.startsWith("2024")==true){
        aux.push(evento)
    }
   } return aux
} 

export function filterEventspast (listaEventos){
    let aux = []
    for (let evento of listaEventos){
        if (evento.date.startsWith("2022") || evento.date.startsWith("2021") || evento.date.startsWith("2019")==true){
        aux.push(evento)
    }
   } return aux
} 

export function imprimirCartaDetails(contenedor, evento) {
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
        <li class="list-group-item"><small class="text-muted">Category: ${evento.category}</small></li>
    </ul>
    <div class="card-body">
        <p class="card-text"><small class="text-success">Price: $${evento.price}</small></p>
    </div>
</div>

`               
}

export function crearEstructuraCartaspastup (evento){
    return `<div class="card h-100 mx-auto">
    <img src="${evento.image}" class="card-img-top img-fluid" alt="${evento.name}">
    <div class="card-body">
      <h5 class="card-title text-center">${evento.name}</h5>
      <p class="card-text text-center">${evento.description}</p>
      <hr>
      <div class=" d-flex justify-content-evenly">
        <p class="card-text precio">$ ${evento.price}</p>
        <p class="card-text ancor"><a class="ancor"
            href="./details.html?parametro=${evento._id}">Details</a></p>
      </div>
    </div>
    </div>`
}

export function imprimirCartaspast(array, referenciahtml2){
    let estructura = ""
    for (const evento of array) {    
        estructura += crearEstructuraCartaspastup(evento)
    }
    referenciahtml2.innerHTML = estructura 
}

export function imprimirCartasup(array, referenciahtml2){
    let estructura = ""
    for (const evento of array) {    
        estructura += crearEstructuraCartaspastup(evento)
    }
    referenciahtml2.innerHTML = estructura 
}




export function mayorAsistencia (data){
    let resultadoPorcentajeMayor = 1
    let aforoMayor
    data.forEach(item => {
        let calculoAux = (item.assistance*100)/item.capacity
        if (calculoAux > resultadoPorcentajeMayor){
            resultadoPorcentajeMayor=calculoAux 
            aforoMayor = item
        }})
    return `${aforoMayor.name} ${resultadoPorcentajeMayor.toFixed(1)}%`
}

export function menorAsistencia (data){
    let resultadoPorcentajeMenor = 100
    let aforoMenor
    data.forEach(item => {
        let calculoAux = (item.assistance*100)/item.capacity
        if (calculoAux < resultadoPorcentajeMenor){
            resultadoPorcentajeMenor=calculoAux 
            aforoMenor = item
        }})
     return `${aforoMenor.name} ${resultadoPorcentajeMenor.toFixed(1)}%`
}

export function eventoMayorCapacidad (data){
    let capacidad = 1
    let eventoMayorCapacidad
    data.forEach(item => {
        item.capacity
        if (item.capacity > capacidad){
            capacidad = item.capacity
            eventoMayorCapacidad = item
        }})
    return `${eventoMayorCapacidad.name} ${eventoMayorCapacidad.capacity}`
}

export function tabla2 (categorias, eventosfuturos ){
    let tabla2 = `
         <tr>
             <td>Categories</td>
             <td>Revenues</td>
             <td>Percentage of assistance</td>
         </tr>`

            categorias.forEach(item => {
            let eventoporCategoria = eventosfuturos.filter(item2 => item2.category==item)

            let ganancia = 0
            let porcentaje = 0
            eventoporCategoria.forEach(e => {
            ganancia += (e.estimate * e.price)
            porcentaje += (e.estimate * 100 / e.capacity)/(eventoporCategoria.length)
            })
            tabla2 += `
         <tr>
            <td>${item}</td>
            <td>$${ganancia.toLocaleString()}</td>
            <td>${porcentaje.toFixed(2)}%</td>
        </tr>`
     })
      return tabla2
 }

export function tabla3(categorias, eventospasados){
    let tabla3 = `
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of assistance</td>
        </tr>`
    categorias.forEach(item => {
        let eventoporCategoria = eventospasados.filter(item2 => item2.category == item)

        let ganancia = 0
        let porcentaje = 0
        eventoporCategoria.forEach(e => {
            ganancia += (e.assistance * e.price)
            porcentaje += (e.assistance * 100 / e.capacity)/(eventoporCategoria.length)
        })
        tabla3 += `
        <tr>
            <td>${item}</td>
            <td>$${ganancia.toLocaleString()}</td>
            <td>${porcentaje.toFixed(2)}%</td>
        </tr>`
    })
    return tabla3
}
