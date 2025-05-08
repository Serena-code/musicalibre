import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormularioBusqueda ({}) {
    const [valorInput , setValorInput] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/BusquedaArtista/${encodeURIComponent(valorInput)}`)
    }

    return(
        <div className = "FormularioBusqueda">
            <form onSubmit={handleSubmit}>
                <input type="text" value={valorInput} name="artista" onChange={(e)=> setValorInput(e.target.value)}></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}
