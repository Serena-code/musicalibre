import axios from 'axios'
import { useEffect, useState } from 'react'
import {DetalleArtista} from '../componentes/DetalleArtista'
import { useParams,Link } from 'react-router-dom'

export function BusquedaArtista() {
  const CLIENT_ID = "6b78425f682040b4a31811c058a3e765"
  const CLIENT_SECRET = "1da5735ec4c94ea290ee06994f65ad09"

  const[artistaSeleccionado,setArtistaSeleccionado] = useState("")
  const{nombreArtista} = useParams()
  const [artista, setArtista] = useState([])
  
  
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
      }
      
    )
    .then((data) => {
      console.log(`Token recibido: ${data.data.access_token}`)
      axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;
      buscarArtista()
      
    })
    .catch((error) => {
      console.log(`Error: ${error}`)
    })
    
  }

  function buscarArtista() {
    
    axios.get(`https://api.spotify.com/v1/search?q=${nombreArtista}&type=artist`, {
    })
    .then((data) => {
      console.log(data.data.artists.items)
      setArtista(data.data.artists.items)
    })
    .catch((error) => {
      console.log(error)
    })
    console.log(artista)
  }

  useEffect(() => {
    pedirToken()

  }, [])

 

  return (
    <div className="BusquedaArtista">
      {!artistaSeleccionado && (
        <>
          <h1>Artistas</h1>
          <Link to={"/"} className='btn'>
            Volver
          </Link>
          <ul>
            {artista.map((artista, index) => (
            <li key={index} onClick={() => setArtistaSeleccionado(artista)}>
              <h1>{artista.name}</h1>
              <img src={artista.images?.[0].url} alt={artista.name} />
            </li>
            ))}
          </ul>
        </>
      )}
  
      {artistaSeleccionado && (
        <div>
          <DetalleArtista artista={artistaSeleccionado} />              
        </div>
      )}
  
    </div>
  );
}

