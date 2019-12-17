var express = require('express');
var router = express.Router();
router.use(express.static('public'));

var storeController = require('../controllers/store')


//router.get('/type=:type&brand=:brand&price=:price&order=:order', storeController.productListFilter)


router.get('/type=:type&brand=:brand&order=:order', storeController.productListByTypeBrandOrder);
router.get('/brand=:brand&type=:type&order=:order', storeController.productListByTypeBrandOrder);
router.get('/type=:type&order=:order&brand=:brand', storeController.productListByTypeBrandOrder);
router.get('/brand=:brand&order=:order&type=:type', storeController.productListByTypeBrandOrder);


router.get('/type=:type&brand=:brand', storeController.productListByTypeAndBrand);
router.get('/type=:type&order=:order', storeController.productListByTypeAndOrder);
router.get('/brand=:brand&order=:order', storeController.productListByBrandAndOrder);
router.get('/brand=:brand&type=:type', storeController.productListByTypeAndBrand);


router.get('/type=:type', storeController.productListByType);

router.get('/brand=:brand', storeController.productListByBrand);

router.get('/id=:id', storeController.productDetailById);

module.exports = router;