
const express = require('express');
const recipeRouter = express.Router();
const fs = require('fs');
const {db} = require('../public/db.json');


/* GET users listing. */
recipeRouter

    .get('/get', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(JSON.parse('[{    "title": "Makaron",    "url": "https://www.jadlonomia.com/?s=makaron",    "notes": "Najpopularniejszą metodą przygotowywania kurek w polskich kuchniach jest podlanie ich śmietanką. To bardzo uniwersalna baza sosów do kaszy, krokietów, placków ziemniaczanych i wszystkich klusek. A co na to weganie i weganki? Mogą zrobić prostą, niewymyślaną śmietankę słonecznikową!",    "category": "main-dishes",    "id": 1  }]'));
    })
    .get('/logout', function(req, res, next) {
        res.redirect('/');
    })

module.exports = recipeRouter

