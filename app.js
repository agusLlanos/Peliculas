// let pagina = 1;
// const btnAnterior = document.getElementById('btnAnterior');
// const btnSiguiente = document.getElementById('btnSiguiente');

// // fetch('https://localhost:7285/guardarDatos', {
// //   method: "POST",
// //   body: {},
// //   headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
// // })
// //   .then(response => response.json())
// //   .then(json => console.log(json))
// //   .catch(err => console.log(err));

// // function MostrarSinopsis(id) {
// //   window.location.href = `./sinopsis.html?idPelicula=${id}`;
// // }

// btnSiguiente.addEventListener('click', () => {
//   if (pagina < 1000) {
//     pagina += 1;
//     cargarPeliculas();
//   }
// })

// btnAnterior.addEventListener('click', () => {
//   if (pagina > 1) {
//     pagina -= 1;
//     cargarPeliculas();
//   }
// })

// const cargarPeliculas = async () => {
//   try {
//     const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG&page=${pagina}`);

//     if (respuesta.status === 200) {
//       const datos = await respuesta.json();      

//       let peliculas = '';   

//       datos.results.forEach(pelicula => {
//         peliculas += `
//         <div class="col-md-4 card foto" id="cards"  >              
//            <img id="imgPoster" class="" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" onClick="MostrarSinopsis(${pelicula.id})" >
//            <div class="card-body" style="">
//              <h4 class="card-title family">${pelicula.title}</h4>
//            </div> 
//             <div class="card-body capa" style="position:absolute">
//               <h4 class="card-title family  text-white">${pelicula.title}</h4>
//               <p class="text-white">${pelicula.overview}</p>
//             </div>              
//       </div>               
//             `;
//       });
//       document.getElementById("contenedor").innerHTML = peliculas;

//     } else if (respuesta === 401) {
//       console.log('llave incorrecta');

//     } else if (respuesta === 404) {
//       console.log('Pelicula no existe');

//     } else {
//       console.log('hubo un error y no sabemos que paso');
//     }
//   }
//   catch (error) {
//     console.log(error);
//   }
// }
// cargarPeliculas();


//drama
var ListadoPeliculas = [];
let array = [];
pagina = 0;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) {
    pagina += 1;
    PeliculasxGen();
  }
})

btnAnterior.addEventListener('click', () => {
  if (pagina > 0) {
    pagina -= 1;
    PeliculasxGen();
  }
})

let numCategoria = 0;

function seleccionarGen() {  
  let contenedorListas = document.querySelector(".contenedor-listas");

  contenedorListas.addEventListener("click", (event) => {
    let categoria = '';
    categoria = event.target.innerHTML;

    document.getElementById("tittleGeneral").innerHTML = categoria;

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
console.log(numCategoria);

const PeliculasxGen = async () => {
  ListadoPeliculas = [];

  for (var i = 1; i < 100; i++) {
    
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG&page=${i}`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
           console.log(numCategoria);
      datos.results.forEach(pelicula => {
        
        if (numCategoria == 0) {
          ListadoPeliculas.push(pelicula);
        }else{
          const pelPorGenero = pelicula.genre_ids.some(pelicula => pelicula == numCategoria)
          if (pelPorGenero) {
            ListadoPeliculas.push(pelicula);
          }
        }
      });
    }
  }
  cargarPeliculas();
}

PeliculasxGen();

function cargarPeliculas() {
  let peliculas = '';
  let variable = pagina + 1;

  let inicio = 21 * pagina;
  let fin = 21 * variable;

  array = ListadoPeliculas.slice(inicio, fin);

  array.forEach(pelicula => {
    peliculas +=
    `
             <div class="col-md-4 card foto" id="cards"  >              
                <img id="imgPoster" class="" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" onClick="MostrarSinopsis(${pelicula.id})" >
                <div class="card-body" style="">
                  <h4 class="card-title family">${pelicula.title}</h4>
                </div> 
                 <div class="card-body capa" style="position:absolute">
                   <h4 class="card-title family  text-white">${pelicula.title}</h4>
                   <p class="text-white">${pelicula.overview}</p>
                 </div>              
           </div>               
                 `;
  })

  document.getElementById("contenedor").innerHTML = peliculas;
}












