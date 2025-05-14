import { useState, useEffect } from 'react'
import axios from 'axios'
import { ArtistaAlbum } from '../componentes/ArtistaAlbum'
import { useNavigate } from 'react-router-dom';

export function Album({ artista }) {
  const navigate = useNavigate();
  const [album, setAlbum] = useState([])
  const [albumSeleccionado, setAlbumSeleccionado] = useState(null)
  
  function buscarAlbum(artista) {
    axios.get(`https://api.spotify.com/v1/artists/${artista.id}/albums`, {
    })
    .then((data) => {
      setAlbum(data.data.items)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (artista) {
      buscarAlbum(artista)
    }
  }, [artista])

  return (
    <div className="Album">
      {!albumSeleccionado && (
        <>
          <h1>Albumes</h1>
          <ul>
            {album.map((album, index) => (
            <li key={index} onClick={()=>setAlbumSeleccionado(album)}>
              <h1>{album.name}</h1>
              <h2>{album.release_date}{album.total_tracks}</h2>
              <img src={album.images[0].url} alt={album.name} /></li>
            ))}
          </ul>
        </>
      )}
  
      {albumSeleccionado && (
        <div>
          <ArtistaAlbum id={albumSeleccionado} ></ArtistaAlbum>
        </div>
      )}
      
     
    </div>
  )
}


