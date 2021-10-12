import React from 'react'
import estilos from '../Platforms/Platforms.module.css'
const Platforms = ({setPlatforms}) => {

    const PLATFORMS = ["PC", "Playstation", "Xbox", "iOS", "Android", "Apple", "Linux", "Nintendo", "Web"]

    function handleOnChange(e) {
        setPlatforms({name: e.target.value})
        let platform = document.querySelector('#plataformasSeleccionadas')
            platform.innerHTML += `${e.target.selectedOptions[0].innerText}, `
    }

    return (
        <div>
            <select onChange={(e) => handleOnChange(e)}>
            <option disabled selected>Plataformas</option>
                {PLATFORMS.map(plat => {
                return (
                    <option>{plat}</option>
                )
            })}
            </select>
            <div className={estilos.plataformas_seleccionadas}>
                <p id='plataformasSeleccionadas'>Plataformas seleccionadas: </p>
            </div>
            
        </div>
    )
}

export default Platforms
{}