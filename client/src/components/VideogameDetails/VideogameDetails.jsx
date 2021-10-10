import {React, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import estilos from '../VideogameDetails/VideogameDetails.module.css'
import {getGameDetails, clearGameDetails} from '../../actions/actions'
import { useParams } from 'react-router-dom'
import LoadingPage from '../LoadingPage/LoadingPage'


const VideogameDetails = () => {

    const gameDetails = useSelector(state => state.gameDetail)
    console.log(gameDetails)
    const dispatch = useDispatch()
    let {id} = useParams()

    useEffect(() => {
        dispatch(clearGameDetails())
        dispatch(getGameDetails(id))
    }, [])

    return ( gameDetails.name ?
        <div className={estilos.contenedor_details}>    
                    <div>
                    <img className={estilos.imagen_de_fondo} src={gameDetails.aditional_image} alt="Not Found"/>
                    <div>
                        <p>Nombre: {gameDetails.name}</p>
                        <p>{gameDetails.description}</p>
                        <div>Rating: {gameDetails.rating}</div>
                        <div>Plataformas: {gameDetails.platforms.map(plat => {
                            return (
                                <div>
                                    <p>{plat.name}</p>
                                </div>
                            )
                        })}</div>
                        <div>Generos: {gameDetails.genres.map(genre => {
                            return (
                                <div>
                                    <p>{genre.name}</p>
                                </div>
                            )
                        })}</div>
                        <p>Release Date: {gameDetails.released_date}</p>
                    </div>
                    </div>
                
        </div> : <LoadingPage/>
    )
}

export default VideogameDetails
