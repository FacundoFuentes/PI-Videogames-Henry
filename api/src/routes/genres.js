const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

router.get('/', async (req, res) => {
    const API_GENRES = await axios.get('https://api.rawg.io/api/genres?key=793cddd48b8c4276aa490eba102602e0')
    const GENRES_NAME = API_GENRES.data.results.map((genre) => {
        return {
            name: genre.name
        }
    })
    
    Genre.bulkCreate(GENRES_NAME)
    res.json(GENRES_NAME)

})

module.exports = router;