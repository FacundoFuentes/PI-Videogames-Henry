import {React, useEffect} from 'react'
import estilos from '../CreateVideogame/CreateVideogame.module.css'
import Platforms from '../Platforms/Platforms'
import {getAllGenres} from '../../actions/actions'
import { useSelector, useDispatch } from 'react-redux'

const CreateVideogame = () => {
    
    useEffect(() => {
        dispatch(getAllGenres())
    }, [])
    
    const dispatch = useDispatch()
    const genres = useSelector(state => state.allGenres)

    function handleOnSubmit(e) {
        
    }

    return (
        <div className={estilos.contenedor_general}>
            <div className={estilos.contenedor_izquierda}>
                <h1>CREA TU</h1>
                <h1>VIDEOJUEGO</h1>
            </div>
            <div className={estilos.contenedor_derecha}>
            <form className={estilos.formulario_derecha} onSubmit={(e) => handleOnSubmit(e)}>
                <input placeholder='Nombre' type="text" />
                <input placeholder='Descripción' type="text" />
                <input placeholder='Imagen' type="text"/>
                <input type="date" min="1952-01-01" max="2050-12-31" placeholder='Fecha de lanzamiento'/>
                <input placeholder='Rating' min="1" max="5" type="number" />
                <label>Géneros</label>
                <select id='genrefilter' className={estilos.panel_boton}>
                {genres[0] ? genres.map(g => {
                    return(
                        <option>{g.name}</option>
                    )
                }) : <option>Loading...</option> }
            </select>
                <label>Plataformas</label>
                <Platforms/>
                <div className={estilos.boton_form}>
                <button>Crear Juego</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default CreateVideogame
