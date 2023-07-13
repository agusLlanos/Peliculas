const MostrarSinopsispelicula = async () => {
  try {

    let params = new URLSearchParams(location.search);
    var id_pelicula = params.get('idPelicula');
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id_pelicula}?api_key=f5f5814324a68653c069e80a54be9406&language=es-ARG`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      console.log(datos.overview);
      let sinopsis = `<h3 class="titulo">${datos.overview}</h3>`
      document.getElementById("lblsinopsis").innerHTML = sinopsis;

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
MostrarSinopsispelicula();