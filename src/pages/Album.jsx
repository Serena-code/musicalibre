import axios from 'axios'

function Album (){
    const [album, setAlbum] = useState([])
    function buscarAlbum(id){
        axios.get(`https://api.spotify.com/v1/artists/${id}/albums`)
        .then((data) => {
          console.log(data.data.album.items)
          setAlbum(data.data.album.items)
        }).catch((error) => {
          console.log(error)
        })
    }

    return (
        <div className="Album">
          <h1>Albumes</h1>
          <ul>
            {album.map((album, index) => {
              return <li key={index}>{album.name}</li>
            })}
          </ul>
        </div>
    );   
}
export default Album