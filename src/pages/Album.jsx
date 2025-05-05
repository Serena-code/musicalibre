import { useState, useEffect } from 'react'
import axios from 'axios'

function Album({ idArtista, token }) {
  const [album, setAlbum] = useState([])

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
    if (idArtista && token) {
      buscarAlbum(idArtista)
    }
  }, [idArtista, token])

  return (
    <div className="Album">
      <ul>
        {album.map((album, index) => (
          <li key={index}>{album.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Album