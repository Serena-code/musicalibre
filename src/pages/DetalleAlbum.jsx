import axios from 'axios'

function DetalleAlbum (){
  const [detalle, setDetalle] = useState([])
  function buscarDetalle(id){
    axios.get(`https://api.spotify.com/v1/albums/${id}`)
    .then((data) => {
      console.log(data.data.detalle.items)
      setAlbum(data.data.detalle.items)
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