var express = require('express')
var router = express.Router()

var index = require('../app/controllers/index_controller')

router.get('/', index.home)

module.exports = router


// /* GET home page. */
// router.get('/', function(req, res) {
//     query = 'select * from "Laptop" limit 4';
//     pool.query(query, function(err, result) {
//         console.log(err, result);
//         res.render('index', { Items: result });
//     })
// });

// router.get('/cart', function(req, res) {
//     res.render('cart');
// });

// router.get('/checkout', function(req, res) {
//     res.render('checkout');
// });

// router.get('/login', function(req, res) {
//     res.render('login');
// });

// router.get('/register', function(req, res) {
//     res.render('register');
// });

// router.get('/forget-password', function(req, res) {
//     res.render('forget-password');
// });

// router.get('/account', function(req, res) {
//     res.render('account');
// });

// router.get('/admin', function(req, res) {
//     res.render('admin/signin');
// });

// module.exports = router;