import {React} from 'react'
import estilos from '../Paginacion/Paginacion.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { GamesOnPageChange } from '../../actions/actions'

const Paginacion = () => {
    
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const pageNumber = useSelector(state => state.pageNumber)
    
    function handleOnClick(e) {
        switch (e.target.id) {
            case '-1':
                if (pageNumber !== 1){
                dispatch(GamesOnPageChange(pageNumber - 1))
                } 
                break;
            case '+1':
                if (pageNumber !== 7) dispatch(GamesOnPageChange(pageNumber + 1))
                break;
            default:
                dispatch(GamesOnPageChange(Number(e.target.id)))
                break;
        }
    }

    return (
        <div className={search ? estilos.contenedor_paginacion : estilos.none}>
            <span id='-1' className={estilos.arrow} onClick={(e) => handleOnClick(e)}>«</span>
            <span id='1' onClick={(e) => handleOnClick(e)}>1</span>
            <span id='2' onClick={(e) => handleOnClick(e)}>2</span>
            <span id='3' onClick={(e) => handleOnClick(e)}>3</span>
            <span id='4' onClick={(e) => handleOnClick(e)}>4</span>
            <span id='5' onClick={(e) => handleOnClick(e)}>5</span>
            <span id='6' onClick={(e) => handleOnClick(e)}>6</span>
            <span id='7' onClick={(e) => handleOnClick(e)}>7</span>
            <span id='+1' className={estilos.arrow} onClick={(e) => handleOnClick(e)}>»</span>
        </div>
    )
}

export default Paginacion
