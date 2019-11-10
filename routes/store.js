var express = require('express');
var router = express.Router();
router.use(express.static('public'));
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
})

router.get('/', function(req, res) {
    res.render('store');
});

router.get('/:type', function(req, res) {
    query = 'select * from \"' + req.params["type"] + '\"';
    pool.query(query, function(err, result) {
        console.log(err, result);
        res.render('store', { Items: result });
    })
});


router.get('/product-details', function(req, res) {
    res.render('product-details');
});

module.exports = router;