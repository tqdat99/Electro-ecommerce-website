var express = require('express');
var router = express.Router();
router.use(express.static('public'));
var adminController = require('../controllers/admin')

router.get('/', function(req, res) {
    res.render('admin/signin');
});

router.get('/manage-users', adminController.userList);

router.get('/manage-users-edit', function(req, res) {
    res.render('admin/manage-users-edit');
});

router.get('/manage-products', function(req, res) {
    res.render('admin/manage-products');
});

router.get('/manage-products-edit', function(req, res) {
    res.render('admin/manage-products-edit');
});

router.get('/manage-orders', function(req, res) {
    res.render('admin/manage-orders');
});


router.get('/manage-orders-details', function(req, res) {
    res.render('admin/manage-orders-details');
});

router.get('/manage-sales', function(req, res) {
    res.render('admin/manage-sales');
});

router.get('/top-sales', function(req, res) {
    res.render('admin/top-sales');
});

module.exports = router;