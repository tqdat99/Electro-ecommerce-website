var express = require('express');
var router = express.Router();
router.use(express.static('public'));

var storeController = require('../controllers/store')

router.get('/type=:type&brand=:brand&order=:order&page=:page', storeController.productList)

router.get('/type=:type&order=:order&page=:page', storeController.productList)

router.get('/filter', storeController.productList);

router.get('/id=:id', storeController.productDetailById);

module.exports = router;