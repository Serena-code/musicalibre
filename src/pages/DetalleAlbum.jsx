import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function DetalleAlbum({ idAlbum }) {
  const [detalle, setDetalle] = useState([])

  function buscarDetalle(id) {
    axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    })
    .then((data) => {
      setDetalle(data.data.tracks.items)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (idAlbum) {
      buscarDetalle(idAlbum)
    }
  }, [idAlbum])
  
  return (
    <div className="buscarDetalle">
      <Link to={"/"} className='btn'>
        Home
      </Link>
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

