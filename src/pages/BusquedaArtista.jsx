import axios from 'axios';
import { useEffect, useState } from 'react';
import { DetalleArtista } from '../componentes/DetalleArtista';
import { useParams, Link } from 'react-router-dom';

let spotifyToken = null;

export function BusquedaArtista({ artistasFavoritos, agregarArtistaFavorito, eliminarArtistaFavorito, esArtistaFavorito }) {
  const CLIENT_ID = "6b78425f682040b4a31811c058a3e765";
  const CLIENT_SECRET = "1da5735ec4c94ea290ee06994f65ad09";

  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const { nombreArtista } = useParams();
  const [artistas, setArtistas] = useState([]);

  function pedirToken() {
     if (spotifyToken) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${spotifyToken}`;
       buscarArtista();
       return;
     }

     axios.post(
       "https://accounts.spotify.com/api/token",
       `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
       {
         headers: {
           "Content-Type": "application/x-www-form-urlencoded"
         }
       }
     )
     .then(({ data }) => {
       spotifyToken = data.access_token;
       console.log(`Token recibido: ${spotifyToken}`);
       axios.defaults.headers.common['Authorization'] = `Bearer ${spotifyToken}`;
       buscarArtista();
     })
     .catch((error) => {
       console.error("Error al obtener token:", error);
       spotifyToken = null;
     });
  }

  function buscarArtista() {
     axios.get(`https://api.spotify.com/v1/search?q=${nombreArtista}&type=artist`) 
      .then(({ data }) => {
        setArtistas(data.artists.items);
      })
      .catch((error) => {
        console.error("Error al buscar artistas:", error);
      });
  }

  useEffect(() => {
    if (nombreArtista) {
      pedirToken();
    }
    setArtistaSeleccionado(null);
  }, [nombreArtista]);

  const manejarFavorito = (artist) => { 
    /*Establece el estado local para mostrar los detalles del artista */
    setArtistaSeleccionado(artist);
  };


  return (
    <div className="BusquedaArtista">
      <div className="ContenedorPrincipalBusqueda">
        <div className="ListaFavoritos">
          <h2>Artistas Favoritos</h2>
          {artistasFavoritos.length === 0 ? (
            <p>No hay artistas favoritos aún.</p>
          ) : (
            <ul>
              {artistasFavoritos.map(artist => (
                <li key={artist.id} onClick={() => manejarFavorito(artist)}>
                  <img src={artist.imageUrl} alt={artist.name} />
                  <h2>{artist.name}</h2>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="SeccionPrincipalBusqueda">
          {!artistaSeleccionado ? (
            <>
              <h1>Resultados de búsqueda para "{nombreArtista}"</h1>
              <Link to="/" className="btn">
                Nueva Búsqueda
              </Link>
              <ul>
                {artistas.map((artista, index) => (
                  <li key={index} onClick={() => setArtistaSeleccionado(artista)}>
                    <h1>{artista.name}</h1>
                    <img
                      src={artista.images?.[0]?.url}
                      alt={artista.name}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <DetalleArtista
              artista={artistaSeleccionado}
              agregarArtistaFavorito={agregarArtistaFavorito}
              eliminarArtistaFavorito={eliminarArtistaFavorito}
              esArtistaFavorito={esArtistaFavorito}
              alVolver={() => setArtistaSeleccionado(null)}
            />
          )}
        </div>
      </div> 
    </div>
  );
}
