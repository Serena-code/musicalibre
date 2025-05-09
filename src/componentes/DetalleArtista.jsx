import {Album} from "../pages/Album"

export function DetalleArtista({artista}) {

  return (
      <div className="DetalleArtista">
        <h2>{artista.name}</h2>
        <img src={artista.images[0].url} alt={artista.name} />
        <Album artista ={artista} ></Album>
      </div>
    )
  }
  