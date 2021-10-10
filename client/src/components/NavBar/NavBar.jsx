import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import estilos from '../NavBar/NavBar.module.css'
import GamerIcon from '../../media/images/GamerIconPNG.png'

const NavBar = () => {

    const pageGames = useSelector(state => state.actualPageGames)
    return (
        pageGames[0] ? 
        <nav>
            <div className={estilos.nav_container}>
                <div className={estilos.nav_container_izquierda}>
                    <NavLink to='/home'>
                        <img className={estilos.nav_gamer_icon} src={GamerIcon} alt="Not Found" />
                    </NavLink>
                </div>
                <div className={estilos.nav_container_derecha}>
                    <NavLink className={estilos.navbar_links} to='/home'>
                        HOME
                    </NavLink>
                    <NavLink className={estilos.navbar_links} to='/create'>
                        CREATE
                    </NavLink>
                    <NavLink className={estilos.navbar_links} to='/about-me'>
                        ABOUT
                    </NavLink>
                    <NavLink className={estilos.navbar_links} to='/contact'>
                        CONTACT
                    </NavLink>
                    <input placeholder='Busca un juego :)' className={estilos.nav_input} type="text" />
                </div>
            </div>
        </nav> : <div className={estilos.contenedor_negro}></div>
    )
}

export default NavBar
