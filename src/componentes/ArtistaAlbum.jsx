import { Link } from "react-router-dom"
import { DetalleAlbum } from "../pages/DetalleAlbum"


export function ArtistaAlbum ({id,token}){
    return(
        <div className="ArtistaAlbum">
            <h1>{id.name}</h1>
            <h2>{id.release_date}{id.total_tracks}</h2>
            <img src={id.images[0].url} alt={id.name} />
            <DetalleAlbum idAlbum={id} token ={token}></DetalleAlbum>
        </div>
    )
}