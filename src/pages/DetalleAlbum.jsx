import { useState, useEffect } from 'react'
import axios from 'axios'

export function DetalleAlbum({ idAlbum, token }) {
  const [detalle, setDetalle] = useState([])

  function buscarDetalle(id) {
    axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((data) => {
      setDetalle(data.data.tracks.items)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (idAlbum && token) {
      buscarDetalle(idAlbum)
    }
  }, [idAlbum, token])
  
  return (
    <div className="buscarDetalle">
      <h1>{detalle.name}</h1>
      <h1>Detalle</h1>
      <ul>
        {detalle.map((detalle, index) => (
          <li key={index}>{detalle.name}{detalle.duration_ms}</li>
        ))}
      </ul>
    </div>
  )
}

