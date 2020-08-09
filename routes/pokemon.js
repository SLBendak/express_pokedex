var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');
const { request } = require('express');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try {
    const pokeFav = await db.pokemon.findAll();
    res.render('favorites', {pokemon: pokeFav});
  } catch (error) {
    console.log('Not Found', error)
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      },
    })
    res.redirect("/pokemon");
    
  } catch (error) {
      res.render("Error:", error);
    
  }
  
});

router.get("/:name", async (req, res) => {

  try {
    if (req.params && req.params.name) {
      const pokemonLink = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`
      const result = await axios.get(pokemonLink)
      let pokemonData = result.data
      res.render('show', { pokedata: pokemonData})
    }
  } catch (error) {
    res.render("Error:", error);
  }
  // if (req.params && req.params.name) {
  //   request(
  //     "https://pokeapi.co/api/vr/pokemon?limit=500>" + req.paramsms.name,
  //     (error, response, body) => {
  //       if(err || response.statusCode != 200) {
  //         res.render("error");
  //       } else {
  //         let pokedata = JSON.parse(body);
  //         res.render("show", { pokedata: pokedata });
  //       }
  //     }
  //   )
  // } else {
  //   res.render("error")
  // }
});



module.exports = router;
