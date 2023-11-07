const express = require('express');
const userRouter = express.Router();

/* GET users listing. */
userRouter

    .get('/login', function(req, res, next) {
    res.redirect('/login');
})
    .get('/logout', function(req, res, next) {
    res.redirect('/');
})
    .get('/register', function(req, res, next) {
     res.redirect('/login');
})

module.exports = userRouter;
