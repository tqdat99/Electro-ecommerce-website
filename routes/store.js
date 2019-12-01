var express = require('express');
var router = express.Router();
router.use(express.static('public'));
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

router.get('/type=:type&brand=:brand', function(req, res) {
    var product = require('../models/product');
    product.productListByTypeAndBrand(req.params["type"], req.params["brand"], function(result) {
        res.render('store', { Items: result });
    });
});

router.get('/type=:type', function(req, res) {
    var product = require('../models/product');
    product.productListByType(req.params["type"], function(result) {
        res.render('store', { Items: result });
    });
});


router.get('/id=:id', function(req, res) {
    var product = require('../models/product');
    product.findProductById(req.params["id"], function(result) {
        res.render('product-details', { item: result });
    });
});

module.exports = router;