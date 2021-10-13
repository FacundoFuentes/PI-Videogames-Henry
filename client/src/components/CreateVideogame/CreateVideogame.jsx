import {React, useEffect, useState} from 'react'
import estilos from '../CreateVideogame/CreateVideogame.module.css'
import Platforms from '../Platforms/Platforms'
import {getAllGames, getAllGenres} from '../../actions/actions'
import { useSelector, useDispatch } from 'react-redux'

const CreateVideogame = () => {
    const initialState = {
        name: "",
        description: "",
        image: "",
        release_date: "",
        rating: 0,
        genres: [],
        platforms: []
    }
    const [input, setinput] = useState(initialState)
    const dispatch = useDispatch()
    const genres = useSelector(state => state.allGenres)

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])
    

    async function handleOnSubmit(e){
        alert('Juego creado 🎮')
        e.preventDefault()
        await fetch("/videogames/videogame", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        dispatch(getAllGames())
        
    }

    function handlePlatChange(platform) {
        setinput({...input, platforms:[...input.platforms, platform]})
    }
    
    function handleOnChange(e) {
        if (e.target.id === 'genres') {
            let genre = document.querySelector('#generosSeleccionados')
            genre.innerHTML += `${e.target.selectedOptions[0].innerText}, `
            setinput({...input, genres: [...input.genres, Number(e.target.selectedOptions[0].id)]})
        } else setinput({...input ,[e.target.id]: e.target.value})
    }

    return (
        <div className={estilos.contenedor_general}>
            <div className={estilos.contenedor_izquierda}>
                <h1>CREA TU</h1>
                <h1>VIDEOJUEGO</h1>
            </div>
            <div className={estilos.contenedor_derecha}>
            <form className={estilos.formulario_derecha} onSubmit={(e) => handleOnSubmit(e)}>
                <input id='name' value={input.name} placeholder='Nombre' type="text" onChange={(e) => handleOnChange(e)} />
                <input id='description' value={input.description} placeholder='Descripción' type="text" onChange={(e) => handleOnChange(e)} />
                <input id='image'  value={input.image} placeholder='Imagen' type="text" onChange={(e) => handleOnChange(e)}/>
                <input id='release_date' value={input.release_date} type="date" min="1952-01-01" max="2050-12-31" placeholder='Fecha de lanzamiento' onChange={(e) => handleOnChange(e)}/>
                <input id='rating' value={input.rating} placeholder='Rating' min="1" max="5" type="number" onChange={(e) => handleOnChange(e)} />
                <label>Géneros</label>
                <select id='genres' className={estilos.panel_boton} onChange={(e) => handleOnChange(e)}>
                <option disabled selected>Géneros</option>
                {genres[0] ? genres.map(g => {
                    return(
                        <option id={g.id}>{g.name}</option>
                    )
                }) : <option>Loading...</option> }
            </select>
            <div className={estilos.generos_seleccionados}>
                <p id='generosSeleccionados'>Géneros seleccionados: </p>
            </div>
                <label>Plataformas</label>
                <Platforms setPlatforms={handlePlatChange}/>
                <div className={estilos.boton_form}>
                <button>Crear Juego</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default CreateVideogame
