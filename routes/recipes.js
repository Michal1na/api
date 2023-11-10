
const { log } = require('console');
const express = require('express');
const recipeRouter = express.Router();
const fs = require('fs');
const RecipeDb = require("../models/RecipeDb");



/* GET recipes listing. */
recipeRouter
    .get('/get', async function (req, res, next) {
        try {
            const items = await RecipeDb.find();
            res.json(items)
        } catch (error) {
            console.error(error);
            res.status(500)
        }
    })

    .post('/addnew', async function (req, res, next) {

        let lastitem = await RecipeDb.findOne().sort({ id: -1 });

        let newId = lastitem.id + 1
        console.log(newId)
        let newReqBody = {
            ...req.body,
            id: newId
        }
        await RecipeDb.create(newReqBody);

        res.sendStatus(200)
    }
    )

    .delete('/delete/:id', async function (req, res, next) {

        await RecipeDb.deleteOne({ id: Number(req.params.id) })

        res.sendStatus(200)
    })
    
    .get('/:category', async function (req, res, next) {
        try {

            const catRecipes = await RecipeDb.find({ category: req.params.category })
            res.json(catRecipes)
        } catch (error) {
            console.error(error);
            res.status(500)
        }

    })




module.exports = recipeRouter

