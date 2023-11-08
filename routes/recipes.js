
const express = require('express');
const recipeRouter = express.Router();
const fs = require('fs');
const {db} = require('../public/db.json');


/* GET users listing. */
recipeRouter

    .get('/get', function(req, res, next) {
        (fs.readFile("./public/db.json", "utf8", (error, data) => {
            if (error) {
                console.log(error);
                return; }
            res.json(JSON.parse(data))}));
    })
    .post('/addnew', function(req, res, next) {
        fs.readFile("./public/db.json", 'utf8', (error, data) => {
            if (error) {
                console.log(error)
            } else {
                let obj = JSON.parse(data);
                obj.push(req.body);
                fs.writeFile("./public/db.json", JSON.stringify(obj), err => {
                    if (err) {
                        console.error(err);
                    }
                })
            }
        })

        res.sendStatus(200)
    })
    .delete('/delete/:id', function(req, res, next) {
        fs.readFile("./public/db.json", 'utf8', (error, data) => {
            if (error) {
                console.log(error)
            } else {
                let obj = JSON.parse(data);
                let newobj = obj.filter((item) => item.id !== req.params.id);

                fs.writeFile("./public/db.json", JSON.stringify(newobj), err => {
                    if (err) {
                        console.error(err);
                    }
                })
            }
        })
        res.sendStatus(200)
    })
module.exports = recipeRouter

