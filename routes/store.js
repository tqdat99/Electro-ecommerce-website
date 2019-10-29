var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('store');
});

router.get('/product-details', function(req, res) {
    res.render('product-details');
});

module.exports = router;