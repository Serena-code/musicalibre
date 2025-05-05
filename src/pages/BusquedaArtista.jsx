import { useEffect, useState } from 'react'
import axios from 'axios'

function BusquedaArtista(){
  const CLIENT_ID = "6b78425f682040b4a31811c058a3e765"
  const CLIENT_SECRET = "1da5735ec4c94ea290ee06994f65ad09"

  const [artista, setArtista] = useState([])
  const [token, setToken] = useState("")
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null)

  function pedirToken() {
    axios.post("https://accounts.spotify.com/api/token",
    {
      grant_type:"client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    },
    {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, 
    }).then((data) => {
      console.log(`Token recibido: ${data.data.access_token}`)
      axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;
    }).catch((error) => {
      console.log(`Error: ${error}`)
      console.log(error)
    })
  }
  return (
    <div className="Busqueda Artista">
      <FormularioBusqueda buscarArtista={buscarArtista} />
  
      {!artistaSeleccionado && (
        <>
          <h1>Artistas</h1>
          <ul>
            {artista.map((artista, index) => (
              <li key={index} onClick={() => setArtistaSeleccionado(artista)}>
                {artista.name}
              </li>
            ))}
          </ul>
        </>
      )}
  
      {artistaSeleccionado && (
        <div>
          <DetalleArtista artista={artistaSeleccionado} />
          <Album idArtista={artistaSeleccionado.id} token={token} />
        </div>
      )}
    </div>
  );
}

export default BusquedaArtista