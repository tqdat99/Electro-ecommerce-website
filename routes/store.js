var express = require('express');
var router = express.Router();
router.use(express.static('public'));

var storeController = require('../controllers/store')

router.get('/type=:type&brand=:brand&order=:order&page=:page', storeController.productlistOrder)

router.get('/type=:type&brand=:brand&page=:page', storeController.productListByTypeAndBrand);

router.get('/type=:type&page=:page', storeController.productListByType);

router.get('/id=:id', storeController.productDetailById);

module.exports = router;