var express = require('express');
var router = express.Router();
router.use(express.static('public'));

var storeController = require('../controllers/store')

router.get('/type=:type&brand=:brand', storeController.productListByTypeAndBrand);

router.get('/type=:type', storeController.productListByType);

router.get('/id=:id', storeController.productDetailById);

module.exports = router;