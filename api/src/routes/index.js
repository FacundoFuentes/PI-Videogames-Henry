const { Router } = require('express');
const videogames = require('./videogames')
const {Genre } = require("../db");
const genres = require('./genres')
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


(async function loadGenres() {
    const API_GENRES = await axios.get('https://api.rawg.io/api/genres?key=793cddd48b8c4276aa490eba102602e0')
    const GENRES_NAME = API_GENRES.data.results.map((genre) => {
        return {
            name: genre.name
        }
    })
    Genre.bulkCreate(GENRES_NAME)
    console.log('Generos cargados correctamente')
})()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames)
router.use('/genres', genres)

module.exports = router;
