import React, { useState } from "react";

export function FormularioBusqueda ({buscarArtista}) {
    const [valorInput , setValorInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        buscarArtista(valorInput)
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
