import axios from 'axios'

function Album (){
    const [album, setAlbum] = useState([])
    
    function buscarAlbum(album){
      axios.get(`https://api.spotify.com/v1/artists`,
      {headers: {
        Authorization: `Bearer ${token}`,
      },params: {
        q: album,
        type: "albums",
      },
    })
      .then((data) => {
        console.log(data.data.albums.items)
        setAlbum(data.data.albums.items)
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