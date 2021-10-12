const express = require("express");
const router = express.Router();
const axios = require("axios");
const {Genre } = require("../db");
const { API_KEY } = process.env;

router.get('/', async (req, res) => {
    const GENRES = await Genre.findAll({})
    res.json(GENRES)
})

module.exports = router;