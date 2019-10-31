var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/store', function(req, res) {
    res.render('store');
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