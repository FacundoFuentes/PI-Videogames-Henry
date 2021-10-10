import React from 'react'
import estilos from '../LoadingPage/LoadingPage.module.css'
import GIF from '../../media/videos/LoadingGIF.gif'

const LoadingPage = () => {
    return (
        <div className={estilos.contenedor_general}>
            <h1>Please Wait</h1>
            <img src={GIF} alt="Not Found" />
        </div>
    )
}

export default LoadingPage
