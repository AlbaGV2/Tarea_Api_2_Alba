//Constantes comunes para todas las partes.
const BASE_URL = "https://rickandmortyapi.com/api";
const estado = document.getElementById('estado');
const result = document.getElementById('result');


document.getElementById("limpiar").addEventListener("click", limpiar);

//creo la funcion limpiar para resetear la busqueda.
function limpiar() {
    result.innerHTML = '';
}


//Parte 1 - Callback

//Asignamos el evento click al boton
document.getElementById("buscarCallback").addEventListener("click", buscarCallback);

function buscarCallback() {

    const id = document.getElementById('characterId').value;
    fetch(`${BASE_URL}/character/${id}`)
    .then(response => response.json())
        //si me devuelve datos, llamo a funcion
        .then(JsonCallback)
        //Si devuelve algo llamo a la funcion del episodio
        .then(PrimerEpisodio)
        //Si no me devuelve nada, me lleva al error
        .catch(error => {
            estado.textContent = 'Error en la petición';
        });

}

function JsonCallback(json) {

    // Meter en constantes cada id para trabajar con ellos

    //Luego añadirle el valor a esas contantes

}
function PrimerEpisodio(){}



//Parte 2 - Promise

//Asignamos el evento click al boton
document.getElementById("buscarPromesas").addEventListener("click", buscarPromesas);

function buscarPromesas() {

    //Recojo el input del personaje a buscar en una canstante id.
    const id = document.getElementById('characterId').value;
    //De mientras se muestra cargando..
    estado.textContent = 'Cargando...';
    //y los datos estan vacios.
    result.innerHTML = '';

    //hacemos la peticion a la Api del personaje a buscar. La API base + el input
    fetch(`${BASE_URL}/character/${id}`)
        //Cuando llegue la respuesta se convierte en json.
        .then(response => response.json())
        //Resultado final, objeto final con informacion del personaje
        .then(data => {
            estado.textContent = 'OK (Promesas)';

            // mostramos los resultados en el html
            result.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.image}" width="150">
        <p>Especie: ${data.species}</p>
        <p>Estado: ${data.status}</p>
      `;
        }) //Error
        .catch(error => {
            estado.textContent = 'Error en la petición';
        });

}



//Parte 3 - Async/Awayt

//Evento clic para cargar con Async/Await
document.getElementById("buscarAsync").addEventListener("click", buscarAsync);

async function buscarAsync() {

    // metemos en una constante el id introducido en el input
    const id = document.getElementById('characterId').value;
     if (!id) return; // Si no escribió nada, salimos

    try {
        // mientras se ejecuta la funcion el estado de busqueda ser este
        estado.textContent = 'Cargando...';
        result.innerHTML = '';

        //hacemos la peticion a la Api del personaje a buscar. La API base + el input 
        //y respuesta convertida en json.
        const response = await fetch(`${BASE_URL}/character/${id}`);
        const data = await response.json();

        estado.textContent = 'OK!';
        //introducimos los datos en el html
        result.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.image}" width="150">
            <p>Especie: ${data.species}</p>
            <p>Estado: ${data.status}</p>
            `;

        //En caso de que haya un error.
    } catch (error) {
        estado.textContent = 'Error en la petición';

    }
}