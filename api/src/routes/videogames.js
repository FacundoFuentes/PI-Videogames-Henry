const express = require("express");
const sequelize = require('sequelize')
const Op = sequelize.Op
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    let ALL_GAMES = []; //Declaro un ARRAY vacio donde vamos a tener TODOS los juegos

    let DATABASE_GAMES = await Videogame.findAll({ //Busco TODOS los juegos en la BD
      include: [{
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      }]
     }); 

    let API_GAMES = []; //Declaro un ARRAY vacio donde voy a guardar lo primeros 100 juegos de la API
    let next_page, current_page; //Dos variables auxiliares que me ayudan a pararme sobre y la siguiente página

    for (let i = 0; i < 5; i++) {
      //Itero 5 veces, ya que (5 * 20) === 100)
      if (i === 0) {
        current_page = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}`
        ); //Si es la primera vez que entramos al ciclo, hago el GET a la API
        next_page = current_page.data.next; //Me guardo el .next que contiene la página siguiente
      } else {
        current_page = await axios.get(next_page); //Si no es la primera vez que entramos, iteramos sobre la siguiente pagina y así sucesivamente
        next_page = current_page.data.next;
      }
      current_page = current_page.data.results.map((game) => {
        //Luego de cada iteración mapeamos para obtener sólo los datos que necesitamos
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((genre) => {
            //Mapeamos también los géneros ya que no necesitamos toda la información que viene dentro
            return {
              id: genre.id,
              name: genre.name,
            };
          }),
        };
      });

      API_GAMES = API_GAMES.concat(current_page); //Concatenamos los juegos de las distintas páginas
    }
    ALL_GAMES = DATABASE_GAMES.concat(API_GAMES); //Concatenamos al final, los juegos en la BD y los juegos de la API
    res.json(ALL_GAMES);

  } else {
      let GAMES_FOUND_API, GAMES_FOUND_DB, GAMES_NEEDED //Variables que voy a necesitar para obtener los juegos

      GAMES_FOUND_DB = await Videogame.findAll({
        attributes: ['id', 'name', 'image', 'platforms'],
        where: {
          name: {
            [Op.like]:  '%Carlos%'
          }
          
        },
        include: [{
          model: Genre,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }]
      })

      GAMES_FOUND_DB = GAMES_FOUND_DB.map((videogame) => {
        return {
          id: videogame.dataValues.id,
          name: videogame.dataValues.name,
          image: videogame.dataValues.image,
          platforms: videogame.dataValues.platforms,
          genres: videogame.dataValues.genres
        }
      })
      console.log(GAMES_FOUND_DB) /////

      GAMES_FOUND_API = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`) //Busco los juegos segun lo que me pasan por query
      
      if (!GAMES_FOUND_API.data.results.length) { //Si el "results" (que son los juegos encontrados) está vacio, devuelvo un 404 seguido de un mensaje de error
        return res.status(404).send('Ningun juego encontrado')
      }
      
      GAMES_FOUND_API = GAMES_FOUND_DB.concat(GAMES_FOUND_API.data.results)

      GAMES_FOUND_API.splice( //Si tengo juegos, la API me trae 20 y solo necesito 15
        GAMES_FOUND_API.length - 5 - GAMES_FOUND_DB.length ,
         5 + GAMES_FOUND_DB.length) 
      GAMES_NEEDED = GAMES_FOUND_API

      GAMES_NEEDED = GAMES_NEEDED.map((game) => { //Mapeo para tener solamente los datos que necesito sobre los videojuegos
          return {
              id: game.id,
              name: game.name,
              image: game.background_image,
              genre: game.genres.map((genre) => {
                return {
                  id: genre.id,
                  name: genre.name,
                };
              }),
              platforms: game.platforms.map((plat) => {
                return {
                  id: plat.platform.id,
                  name: plat.platform.name,
                }
              })
          }
      })
      res.json(GAMES_NEEDED)
  }
});

router.get('/:idVideogame', async (req, res) => {
    const {idVideogame} = req.params
    let GAME_SEARCH_FOUND, GAME_SEARCH

    if (typeof idVideogame === 'string' && idVideogame.length > 10) {
      const DB_GAME = await Videogame.findOne({
        where: {
          id: idVideogame
        },
        attributes: ['id', 'name', 'description', 'release_date', 'rating', 'rating_title', 'platforms'],
        include: [{
          model: Genre,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }]
      })
      return res.json(DB_GAME)
    }
    
    GAME_SEARCH = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

    const {id, name, description, released, ratings, platforms, genres} = GAME_SEARCH.data

    GAME_SEARCH_FOUND = {
        id,
        name,
        description,
        released_date: released,
        rating: ratings.map((rating) => {
            return rating ? {
                id: rating.id,
                title: rating.title,
                count: rating.count,
            } : []
        }),
        platforms: platforms.map((plat) => {
            return plat ? {
                id: plat.platform.id,
                name: plat.platform.name,
            } : []
        }),
        genres: genres.map((genre) => {
            return genre ? {
                id: genre.id,
                name: genre.name,
            } : []
        })
    }
    res.json(GAME_SEARCH_FOUND)
})

router.post('/videogame', async (req, res) => {

  const {name, description, release_date, rating, rating_title, platforms, image, genres} = req.body

  const [CREATE_VIDEOGAME, created] = await Videogame.findOrCreate({
    where: {
      name,
      description,
      release_date,
      rating,
      rating_title,
      platforms,
      image,
    }
  })

  CREATE_VIDEOGAME.addGenres(genres)
  res.json(CREATE_VIDEOGAME)

})

module.exports = router;