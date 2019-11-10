var express = require('express');
var router = express.Router();
var pg = require('pg'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session);

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    database: 'EcomDB',
    password: 'dat',
    host: 'localhost',
    port: 3001,
    max: 10,
    idleTimeoutMillis: 300000000,
});

/* GET home page. */
router.get('/', function(req, res) {
    query = 'select * from "Laptop" limit 4';
    pool.query(query, function(err, result) {
        console.log(err, result);
        res.render('index', { Items: result });
    })
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