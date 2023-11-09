
const { log } = require('console');
const express = require('express');
const recipeRouter = express.Router();
const fs = require('fs');



/* GET recipes listing. */
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
                let lastitem= obj[obj.length-1]                
                newId = lastitem.id +1 
                console.log(newId)
                let newReqBody = {
                    
                    ...req.body,
                    id: newId
                }
                obj.push(newReqBody);
                

            
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
                let newobj = obj.filter((item) => item.id != req.params.id);

                fs.writeFile("./public/db.json", JSON.stringify(newobj), err => {
                    if (err) {
                        console.error(err);
                    }
                })
            }
        })
       
        res.sendStatus(200)
        
    })
    // show recipes by categories
    .get('/:category', function (req, res, next) {
        (fs.readFile("./public/db.json", "utf8", (error, data) => {
            if (error) {
                console.log(error);
                return
            } else {
                let obj = JSON.parse(data);
                res.json(obj.filter((item) => item.category === req.params.category));
            }
        }))
        
    })
module.exports = recipeRouter

