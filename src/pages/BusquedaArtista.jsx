import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { FormularioBusqueda } from '../componentes/FormularioBusqueda'



function BusquedaArtista(){
  const CLIENT_ID = "6b78425f682040b4a31811c058a3e765"
  const CLIENT_SECRET = "1da5735ec4c94ea290ee06994f65ad09"

  const [artista, setArtista] = useState([])
  const [token,setToken] = useState("")
  
  function pedirToken() {
    const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    
    axios.post("https://accounts.spotify.com/api/token",
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`
        }
      }
    )
    .then((data) => {
      console.log(`Token recibido: ${data.data.access_token}`);
      setToken(data.data.access_token);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  function buscarArtista(artista){
    if(!token){
      console.warn("Token aún no disponible.")
    }
    axios.get(`https://api.spotify.com/v1/search`,
    {headers: {
      Authorization: `Bearer ${token}`,
    }, params: {
      q: artista,
      type: "artist",
    },
  })
    .then((data) => {
      console.log(data.data.artists.items)
      setArtista(data.data.artists.items)
    }).catch((error) => {
      console.log(error)
    })
  }
        
  useEffect(() => {
    pedirToken();
  }, []);

  return (
    <div className="Busqueda Artista">
      <FormularioBusqueda
      buscarArtista = {buscarArtista}
      >
      </FormularioBusqueda>
      <h1>Artista</h1>
      <ul>
        {artista.map((artista, index) => {
          return <li key={index}>{artista.name}</li>
        })}
      </ul>
      
    </div>
  );  
}
export default BusquedaArtista