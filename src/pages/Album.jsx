import { useState, useEffect } from 'react'
import axios from 'axios'
import { ArtistaAlbum } from '../componentes/ArtistaAlbum'
import { DetalleAlbum } from './DetalleAlbum'

export function Album({ artista, token }) {
  const [album, setAlbum] = useState([])
  const [albumSeleccionado, setAlbumSeleccionado] = useState(null)

  function buscarAlbum(id) {
    axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((data) => {
      setAlbum(data.data.items)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (artista && token) {
      buscarAlbum(artista)
    }
  }, [artista, token])

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
          <ArtistaAlbum id={albumSeleccionado}></ArtistaAlbum>
          <DetalleAlbum idAlbum={albumSeleccionado.id} token={token}></DetalleAlbum>
        </div>
      )}
      
    </div>
  )
}


