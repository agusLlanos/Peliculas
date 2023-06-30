let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
// fetch('https://localhost:7285/weatherforecast')
// .then(response => response.json()) 
// .then(x => console.log(x))
// .catch(err => console.log(err));

fetch('https://localhost:7285/guardarDatos', {
  method: "POST",
  body: {},
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));

function MostrarSinopsis(id) {
  window.location.href = `./sinopsis.html?idPelicula=${id}`;
}

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
})

btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
})


const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG&page=${pagina}`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      console.log(datos)
      let peliculas = '';
      datos.results.forEach(pelicula => {
        peliculas += `
            <div class="col-md-4 card" id="cards" >
                <img id="imgPoster" class="" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" onClick="MostrarSinopsis(${pelicula.id})" >
                <div class="card-body">
                <h5 class="card-title">${pelicula.title}</h2>
                </div>
            </div>                      
            `;

      });
      document.getElementById("contenedor").innerHTML = peliculas;


    } else if (respuesta === 401) {
      console.log('llave incorrecta');

    } else if (respuesta === 404) {
      console.log('Pelicula no existe');

    } else {
      console.log('hubo un error y no sabemos que paso');
    }

  }
  catch (error) {
    console.log(error);
  }

}
cargarPeliculas();





