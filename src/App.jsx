import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { FormularioBusqueda } from './componentes/FormularioBusqueda';
import { BusquedaArtista } from './pages/BusquedaArtista';
import { useState } from 'react';

function App() {
  const [favoritos, setFavoritos] = useState([]);

  const agregarArtistaFavorito = (infoArtista) => {
    if (!favoritos.some(fav => fav.id === infoArtista.id)) { /*verificar que no este dentro de la lista */
      setFavoritos([...favoritos, {
        id: infoArtista.id,
        name: infoArtista.name,
        imageUrl: infoArtista.images?.[0]?.url 
      }]);
      console.log(`Agregado ${infoArtista.name} a favoritos.`);
    } else {
        console.log(`${infoArtista.name} ya es un favorito.`);
    }
  };

  const eliminarArtistaFavorito = (artistaId) => {
    setFavoritos(favoritos.filter(fav => fav.id !== artistaId));
    console.log(`Eliminado artista con ID ${artistaId} de favoritos.`);
  };

  const esArtistaFavorito = (artistaId) => {
    if (!artistaId) return false;
    return favoritos.some(fav => fav.id === artistaId);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<FormularioBusqueda />} />

          <Route
            path="/BusquedaArtista/:nombreArtista"
            element={
              <BusquedaArtista
                artistasFavoritos={favoritos} 
                agregarArtistaFavorito={agregarArtistaFavorito}
                eliminarArtistaFavorito={eliminarArtistaFavorito}
                esArtistaFavorito={esArtistaFavorito} 
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
