var express = require('express');
var router = express.Router();
var pg = require('pg'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session);

const { Pool, Client } = require('pg')
    // const pool = new Pool({
    //     user: 'xljfmycrkdjihn',
    //     database: 'degkor64j0gfe6',
    //     password: '9ace4aff47858df147c4f0f041220c0b2ed2c605e962e531b714f90a1460549f',
    //     host: 'ec2-50-17-231-192.compute-1.amazonaws.com',
    //     port: 5432,
    //     max: 10,
    //     idleTimeoutMillis: 300000000,
    // });

// DATABASE_URL = "postgres://xljfmycrkdjihn:9ace4aff47858df147c4f0f041220c0b2ed2c605e962e531b714f90a1460549f@ec2-50-17-231-192.compute-1.amazonaws.com:5432/degkor64j0gfe6"
// pg.connect(process.env.DATABASE_URL, function(err, client) {});

const pool = new Pool({
    user: 'postgres',
    database: 'EcomDB',
    password: 'dat',
    host: 'localhost',
    port: 3001,
    max: 10,
    idleTimeoutMillis: 300000000,
})

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