import axios from 'axios'

function DetalleAlbum (){
  const [detalle, setDetalle] = useState([])
  function buscarDetalle(detalle){
    axios.get(`https://api.spotify.com/v1/albums`,
    {headers: {
      Authorization: `Bearer ${token}`,
    },params: {
      q: detalle,
      type: "albums",
    },
  })
    .then((data) => {
      console.log(data.data.detalle.items)
      setDatalle(data.data.detalle.items)
    }).catch((error) => {
      console.log(error)
    })
  }
        
  return (
    <div className="DetalleAlbum">
    <h1>Detalle Album</h1>
    <ul>
      {detalle.map((detalle, index) => {
        return <li key={index}>{detalle.name}</li>
      })}
    </ul>
    </div>
  )
}

export default DetalleAlbum