import React from 'react'
import {NavLink} from 'react-router-dom'
import estilos from '../LandingPage/LandingPage.module.css'
import backgroundVideo from '../../media/videos/Clouds.mp4'

const LandingPage = () => {

    function handleOnClick() {
        
    }

    return (
        <div className={estilos.contenedor}>
            <video src={backgroundVideo} className={estilos.background_video} autoPlay muted loop></video>
            <div className={estilos.contenedor_centro}>
                <div className={estilos.contenedor_texto_centro}>
                <h1>Aquí termina tu busqueda</h1>
                </div>
                <div className={estilos.contenedor_boton_centro}>
                <NavLink className={estilos.NavLink} to='/home'>
                <p onClick={() => handleOnClick()}>Haz click para entrar</p>
                </NavLink>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
