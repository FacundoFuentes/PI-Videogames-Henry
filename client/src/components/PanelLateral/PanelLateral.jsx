import {React, useState, useEffect} from 'react'
import Paginacion from '../Paginacion/Paginacion'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGenres, filterByGenre, filterBDorAPI, orderAZ, orderRating, resetFilters, userSearch } from '../../actions/actions'
import estilos from '../PanelLateral/PanelLateral.module.css'

const PanelLateral = () => {

    const [booleanAZ, setBooleanAZ] = useState(true)
    const [rating, setrating] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])


    const genres = useSelector(state => state.allGenres)


    function handleOnClick(e) {
        switch (e.target.id) {
            case 'azfilter':
                booleanAZ ? e.target.innerHTML = 'Filtrado Z-A' : e.target.innerHTML = 'Filtrado A-Z'
                setBooleanAZ(!booleanAZ)
                dispatch(orderAZ(booleanAZ))
                break;
            case 'ratingfilter':
                rating ? e.target.innerHTML = 'Rating 5-1' : e.target.innerHTML = 'Rating 1-5'
                setrating(!rating)
                dispatch(orderRating(rating))
                break;
            case 'genrefilter':
                dispatch(filterByGenre(e.target.value))
                break;
            case 'bdfilter':
                dispatch(filterBDorAPI('BD'))
                break;
            case 'apifilter':
                dispatch(filterBDorAPI('API'))
                break;
            case 'resetfilters':
                dispatch(userSearch(true))
                dispatch(resetFilters())
                break;
            default:
                break;
        }
    }
    return (
        <div className={estilos.contenedor_general}>
        <div className={estilos.panel_contenedor}>
            <button id='azfilter' className={estilos.panel_boton} onClick={(e) => handleOnClick(e)}>Filtrado A-Z</button>
            <button id='ratingfilter' className={estilos.panel_boton} onClick={(e) => handleOnClick(e)}>Rating 1-5</button>
            <select value={'default'} id='genrefilter' className={estilos.panel_boton} onChange={(e) => handleOnClick(e)}>
                <option value='default' disabled>Género</option>
                {genres[0] ? genres.map(g => {
                    return(
                        <option key={g.id}>{g.name}</option>
                    )
                }) : <option>Loading...</option> }
            </select>
            <button id='bdfilter' className={estilos.panel_boton} onClick={(e) => handleOnClick(e)}>Juegos de la BD</button>
            <button id='apifilter' className={estilos.panel_boton} onClick={(e) => handleOnClick(e)}>Juegos de la API</button>
            <button id='resetfilters' className={estilos.panel_boton} onClick={(e) => handleOnClick(e)}>Reiniciar Filtros</button>
        </div>
        <div className={estilos.contenedor_paginacion}>
            <Paginacion/>
        </div>
        </div>
    )
}

export default PanelLateral
