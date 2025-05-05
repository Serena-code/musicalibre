function DetalleArtista({ artista }) {
    return (
      <div className="DetalleArtista">
        <h2>{artista.name}</h2>
        <img src={artista.images[0].url} alt={artista.name} />
        <h3>Álbumes</h3>
      </div>
    )
  }
  
  export default DetalleArtista