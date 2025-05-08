import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import { FormularioBusqueda } from './componentes/FormularioBusqueda'
import { ArtistaAlbum } from './componentes/ArtistaAlbum'
import { DetalleArtista } from './componentes/DetalleArtista'
import {BusquedaArtista} from './pages/BusquedaArtista'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormularioBusqueda/>}></Route>
          <Route path="/BusquedaArtista/:nombreArtista" element={<BusquedaArtista/>} />
          <Route path="/ArtistaAlbum" element={<ArtistaAlbum/>}></Route>
          <Route path="/DetalleArtista" element={<DetalleArtista/>}></Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
