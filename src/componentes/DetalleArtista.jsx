import {Album} from "../pages/Album";

export function DetalleArtista({ artista, agregarArtistaFavorito, eliminarArtistaFavorito, esArtistaFavorito, alVolver }) { 

/* Verifica si el artista actual es favorito */
  const esFavorito = esArtistaFavorito(artista.id); 

  const manejarFavorito = () => {
    if (esFavorito) {
      eliminarArtistaFavorito(artista.id); 
    } else {
      agregarArtistaFavorito({
         id: artista.id,
         name: artista.name,
         images: artista.images 
      });
    }
  };

  return (
      <div className="DetalleArtista">
        <button onClick={alVolver} className="btn"> 
           Volver a la Búsqueda
        </button>

        <h2>{artista.name}</h2>
        <img src={artista.images?.[0]?.url} alt={artista.name} /> 

        <button onClick={manejarFavorito}> 
          {esFavorito ? "Quitar de Favoritos" : "Marcar como Favorito"} 
        </button>

        <Album artista ={artista} ></Album>
      </div>
    )
  }
  