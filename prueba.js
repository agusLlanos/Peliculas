//drama
var ListadoPeliculas = [];
let array = [];

const cargarPeliculasxGen = async () => {  
  for (var i = 1; i < 100; i++) {

    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG&page=${i}`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      datos.results.forEach(pelicula => {
        const itsDrama = pelicula.genre_ids.some(pelicula => pelicula == 18)
        if (itsDrama) {
          ListadoPeliculas.push(pelicula)
        }
      });
    }
  }
  cargar();
}

cargarPeliculasxGen();

function cargar() {
  let peliculas = '';
  let variable = pagina + 1;

  let inicio = 21 * pagina;
  let fin = 21 * variable;

  array = ListadoPeliculas.slice(inicio, fin);

  array.forEach(pelicula => {
    peliculas +=
      `<div class="col-md-4 card" id="cards" >
             <img id="imgPoster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
             <div class="card-body">
               <h4 class="card-title family">${pelicula.title}</h4>
             </div>
           </div>`;
  })

  document.getElementById("contenedor").innerHTML = peliculas;
}

pagina = 0;
valor = '';

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// let opcion = '';

// if (pagina ==0){
// opcion = `<button id="btnAnterior" disabled>Anterior</button>`

// }else{
//   opcion = `<button id="btnAnterior">Anterior</button>`


// }
// document.getElementById("btnAnterior").innerHTML = opcion;

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculasxGen();
  }
})

btnAnterior.addEventListener('click', () => {
  if (pagina > 0) {
    pagina -= 1;
    cargarPeliculasxGen();
  }
})

