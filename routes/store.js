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

// const { Pool, Client } = require('pg')
// const pool = new Pool({
//     user: 'xljfmycrkdjihn',
//     database: 'degkor64j0gfe6',
//     password: '9ace4aff47858df147c4f0f041220c0b2ed2c605e962e531b714f90a1460549f',
//     host: 'ec2-50-17-231-192.compute-1.amazonaws.com',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 300000000,
// });

router.get('/type=:type&brand=:brand', function(req, res) {
    query = 'select * from \"' + req.params["type"] + '\" where brand = \'' + req.params["brand"] + '\'';
    // var product = require('../models/product');

    // product.productListByTypeAndBrand(req.params["type"], req.params["brand"], function(result) {
    //     console.log(req.params["type"]);
    //     console.log(req.params["brand"]);
    //     console.log(err, result);
    //     res.render('store', { Items: result });
    // }); 
    pool.query(query, function(err, result) {
        console.log(query);
        console.log(req.params["type"]);
        console.log(req.params["brand"]);
        console.log(err, result);
        if (result.rowCount > 0) {
            res.render('store', { Items: result });
        }
    });
});

router.get('/type=:type', function(req, res) {
    query = 'select * from \"' + req.params["type"] + '\"';
    console.log(query);
    pool.query(query, function(err, result) {
        console.log(err, result);
        res.render('store', { Items: result });
    })
});


router.get('/id=:id', function(req, res) {
    laptopQuery = 'select * from "Laptop" where id = \'' + req.params["id"] + '\'';
    tiviQuery = 'select * from "Tivi" where id = \'' + req.params["id"] + '\'';
    dienthoaiQuery = 'select * from "Dienthoai" where id = \'' + req.params["id"] + '\'';

    pool.query(laptopQuery, function(err, resultLaptop) {
        if (resultLaptop.rowCount > 0) {
            console.log(err, resultLaptop.rows[0].name);
            res.render('product-details', { item: resultLaptop.rows[0] });
        }
    });
    pool.query(tiviQuery, function(err, resultTivi) {
        if (resultTivi.rowCount > 0) {
            console.log(err, resultTivi.rows[0].name);
            res.render('product-details', { item: resultTivi.rows[0] });
        }
    });
    pool.query(dienthoaiQuery, function(err, resultDienthoai) {
        if (resultDienthoai.rowCount > 0) {
            console.log(err, resultDienthoai.rows[0].name);
            res.render('product-details', { item: resultDienthoai.rows[0] });
        }
    });
});

module.exports = router;