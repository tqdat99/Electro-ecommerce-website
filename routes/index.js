var express = require('express');
var router = express.Router();
var pg = require('pg'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session);

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
})

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/cart', function(req, res) {
    res.render('cart');
});

router.get('/checkout', function(req, res) {
    res.render('checkout');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/forget-password', function(req, res) {
    res.render('forget-password');
});

router.get('/account', function(req, res) {
    res.render('account');
});

router.get('/admin', function(req, res) {
    res.render('admin/signin');
});

module.exports = router;