const { log } = require('console');
const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');

/* GET users listing. */
userRouter

    .post('/login', function (req, res, next) {
        fs.readFile("./public/dblogin.json", 'utf8', (error, data) => {
            if (error) {
                console.log(error)                
                res.sendStatus(401)
            } else {

                let obj = JSON.parse(data);
                let user = obj.find(item => item.email === req.body.email)
                if (user) {
                    
                    console.log('user email found in database')
                    {
                        bcrypt.compare(req.body.pass, user.hash, (err, passhash) => {
                            if (passhash) {
                                console.log('user pass found in database')
                                res.sendStatus(200)
                            } else {
                                console.error('user not found')
                            }
                        })

                    }

                } else 
                res.status(401).send("Please register")


            }
        })


    }

    )

    .get('/logout', function (req, res, next) {
        res.redirect('/');
        res.sendStatus(200)



    })
    .post('/register', function (req, res, next) {
        let registryData = req.body
        console.log(req.body);

        const save = () => {
            fs.readFile("./public/dblogin.json", 'utf8', (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    let obj = JSON.parse(data);
                    obj.push(registryData);
                    fs.writeFile("./public/dblogin.json", JSON.stringify(obj), err => {
                        if (err) {
                            console.error(err);
                        }
                    })
                }
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(registryData.pass, salt, (err, passhash) => {
                console.log(passhash)
                registryData.pass = passhash
                save();
            });
        })
        res.sendStatus(200)
    });

module.exports = userRouter;
