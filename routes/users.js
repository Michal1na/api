const { log } = require('console');
const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const UsersDb = require("../models/UserDb");

/* GET users listing. */
userRouter


    .post('/login', async function (req, res, next) {
        let user = await UsersDb.findOne({ email: req.body.email })
        if (user) {

            console.log('user email found in database')
            {
                bcrypt.compare(req.body.pass, user.pass, (err, passhash) => {
                    if (passhash) {
                        console.log('user pass found in database')
                        res.sendStatus(200)
                    } else {
                        console.error('user not found')
                    }
                })


            }
        } else {
            res.status(401).send("Please register")
        }


    }
    )


    .get('/logout', function (req, res, next) {
        res.redirect('/');
        res.sendStatus(200)



    })

    .post('/register', async function (req, res, next) {
        let registryData = req.body;

        const save =  async () => {
            await UsersDb.create(registryData);

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
