import {React, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import estilos from '../VideoGameCards/VideoGameCards.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {getAllGames} from '../../actions/actions'
import LoadingPage from '../LoadingPage/LoadingPage.jsx'
import imagenN from '../../media/images/image-not-found.png'


const VideoGameCards = () => {


    function checkURL(url) {
        if (typeof url !== 'string') return false;
        return (url.match(/\.(jpg|jpeg|gif|png)$/) != null);
      }
    function renderSwitch(key) {
        key = Math.floor(key)
        return <h1>{'⭐'.repeat(key)}</h1>
    }

    useEffect(() => {
        if(!pageGames[0]) dispatch(getAllGames())
    }, [])

    const pageGames = useSelector(state => state.actualPageGames)
    const dispatch = useDispatch()

    return (
        pageGames[0] ? pageGames[0].msg !== 'error' ? 
        <div className={estilos.videogame_cards_container}>
            {pageGames.map(game => {
                return (
                    <div key={game.id} className={estilos.videogame_card}>
                        <NavLink className={estilos.navlink_imagen} to={`/details/${game.id}`}>
                        <img className={estilos.videogame_image} src={checkURL(game.image) ? game.image : imagenN} alt='Not Found'></img> 
                        <div className={estilos.contenedor_hover}>                 
                        <p className={estilos.videogame_card_text_name}>{game.name}</p>
                        <div className={estilos.videogame_card_text_genre}>
                        {game.genres.map(genre => {
                            return (
                                <span>{genre.name} </span>
                            )
                        })}
                        </div>
                        <div className={estilos.contenedor_ratings}>
                            {renderSwitch(game.rating)}
                        </div>
                        </div>
                        </NavLink>
                    </div>
                )
            })}
        </div> : <h1>No hay videojuegos para mostrar :(</h1> : <LoadingPage/>
    )
}

export default VideoGameCards
