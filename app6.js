//romantica
pagina = 1;

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculasxGen();
  }
})

btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculasxGen();
  }
})
let sum = (a, b) => a + b;
let x = sum(50, 20);
document.getElementById("contenedor").innerHTML = x;

const cargarPeliculasxGen = async () => {
  const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG&page=${pagina}`);
  if (respuesta.status === 200) {
    const datos = await respuesta.json();
    console.log(datos);

    let peliculas = '';

    datos.results.forEach(pelicula => {
      const itsDrama = pelicula.genre_ids.some(pelicula => pelicula == 10749)
      if (itsDrama == true) {
        peliculas += `<div class="col-md-4 card" id="cards" >
                <img id="imgPoster" class="" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" onClick="MostrarSinopsis(${pelicula.id})" >
                <div class="card-body">
                <h4 class="card-title family">${pelicula.title}</h4>
                </div>
            </div>                      
            `;
      }
    });
    document.getElementById("contenedor").innerHTML = peliculas;
  }
}
cargarPeliculasxGen();
