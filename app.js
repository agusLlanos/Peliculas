
var ListadoPeliculas = [];
var listadoTodasLasPeliculas = [];
let array = [];
pagina = 0;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;

    if (bandera == 0) {
      PeliculasxGen();
    } else {
      cargarPeliculas();
    }
  }
})

btnAnterior.addEventListener('click', () => {
  if (pagina > 0) {
    pagina -= 1;

    let element = document.getElementById("btnSiguiente")      
      element.style.display = 'block';

    if (bandera == 0) {
      PeliculasxGen();
    } else {
      
      cargarPeliculas();
    }
  }
})

let numCategoria = 0;
let categoria = 'Populares';

function seleccionarGen() {
  let contenedorListas = document.querySelector(".contenedor-listas");

  contenedorListas.addEventListener("click", (event) => {    
    bandera = 0;
    categoria = event.target.innerHTML;
    console.log(event);
    pagina = 0;

    document.getElementById("txtBuscar").value = "";

    document.getElementById("tittleGeneral").innerHTML = categoria;

    let element = document.getElementById("btnSiguiente")      
      element.style.display = 'block'; 

    if (categoria == 'Drama') {
      numCategoria = 18;
    }
    else if (categoria == 'Terror') {
      numCategoria = 27;
    }
    else if (categoria == 'Romanticas') {
      numCategoria = 10749;
    }
    else if (categoria == 'Comedia') {
      numCategoria = 35;
    }
    else {
      numCategoria = 0;
    }
    PeliculasxGen();
  })
}

seleccionarGen();

const PeliculasxGen = async () => {
  ListadoPeliculas = [];
  listadoTodasLasPeliculas = [];

  for (var i = 1; i < 100; i++) {
    try {
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2e7d2b43853a1032aad1933adb41f4da&language=es-ARG&page=${i}`);

      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        datos.results.forEach(pelicula => {

          if (numCategoria == 0) {
            ListadoPeliculas.push(pelicula);            
          } else {
            const pelPorGenero = pelicula.genre_ids.some(pelicula => pelicula == numCategoria)
            if (pelPorGenero) {
              ListadoPeliculas.push(pelicula);
            }
          }
        });
      }
      else if (respuesta === 401) {
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
}

PeliculasxGen();

function cargarPeliculas() {
  let peliculas = '';
  let sinopsis = '';

  let variable = pagina + 1;

  let inicio = 21 * pagina;
  let fin = 21 * variable;

  if (bandera == 0) {
    array = ListadoPeliculas.slice(inicio, fin);
    array.forEach(pelicula => {

      if (pelicula.overview == '') {
        sinopsis = 'No posee sinopsis'
      } else {
        sinopsis = pelicula.overview
      }

      peliculas +=
        `
     <div class="col-md-4 card foto" id="cards"  >              
        <img id="imgPoster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <div class="card-body">
          <h4 class="card-title family">${pelicula.title}</h4>
        </div> 
        <div class="card-body capa" style="position:absolute">
          <h4 class="card-title family  text-white">${pelicula.title}</h4>
          <p class="text-white">${sinopsis}</p>
        </div>              
      </div>               
                 `;
    })
  } else if (bandera == 1) {
    array = buscarPelicula.slice(inicio, fin);    
     
    array.forEach(pelicula => {
      if (pelicula.overview == '') {
        sinopsis = 'No posee sinopsis'
      } else {
        sinopsis = pelicula.overview
      }
      peliculas +=
        `
       <div class="col-md-4 card foto diseño" id="cards"  >              
          <img id="imgPoster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <div class="card-body">
            <h4 class="card-title family">${pelicula.title}</h4>
          </div> 
          <div class="card-body capa" style="position:absolute">
            <h4 class="card-title family text-white">${pelicula.title}</h4>
            <p class="text-white">${sinopsis}</p>
          </div>              
        </div>               
                   `;
    })

    if (array.length<=20){
      let element = document.getElementById("btnSiguiente")      
      element.style.display = 'none';        
    } else{
      let element = document.getElementById("btnSiguiente")      
      element.style.display = 'block'; 
    }
  }

  document.getElementById("contenedor").innerHTML = peliculas;
}
let txtBuscar = ''
let bandera = 0;
let buscarPelicula = [];
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener('click', () => {
  bandera = 1;
  txtBuscar = document.getElementById("txtBuscar").value;

  buscarPelicula = ListadoPeliculas.filter(pelicula => pelicula.title.toLowerCase().includes(txtBuscar.toLowerCase()));

  if (buscarPelicula.length >= 1) {
    let mayuscula = `Busqueda para "${txtBuscar[0].toUpperCase()}${txtBuscar.substring(1)}"`;
    document.getElementById("tittleGeneral").innerHTML = mayuscula;

    cargarPeliculas();

  } else {
    let titulo = `No hay resultados para "${txtBuscar[0].toUpperCase()}${txtBuscar.substring(1)}" en la categoria ${categoria}`
    document.getElementById("tittleGeneral").innerHTML = titulo;
    document.getElementById("contenedor").innerHTML = "";
  }

})








