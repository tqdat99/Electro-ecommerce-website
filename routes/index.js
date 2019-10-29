var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/store', function(req, res) {
    res.render('store');
});

router.get('/store-product-details', function(req, res) {
    res.render('product-details');
});

router.get('/checkout', function(req, res) {
    res.render('checkout');
});

module.exports = router;