var express = require('express');
var router = express.Router();
router.use(express.static('public'));

var storeController = require('../controllers/store')


router.get('/type=:type&brand=:brand&order=:order&price=:price', storeController.productListFilter)
router.get('/brand=:brand&type=:type&order=:order&price=:price', storeController.productListFilter)
router.get('/type=:type&order=:order&brand=:brand&price=:price', storeController.productListFilter)
router.get('/brand=:brand&order=:order&type=:type&price=:price', storeController.productListFilter)

router.get('/type=:type&brand=:brand&price=:price&order=:order', storeController.productListFilter)
router.get('/brand=:brand&type=:type&price=:price&order=:order', storeController.productListFilter)
router.get('/type=:type&price=:price&brand=:brand&order=:order', storeController.productListFilter)
router.get('/brand=:brand&price=:price&type=:type&order=:order', storeController.productListFilter)

router.get('/type=:type&order=:order&price=:price&brand=:brand', storeController.productListFilter)
router.get('/brand=:brand&order=:order&price=:price&type=:type', storeController.productListFilter)
router.get('/type=:type&price=:price&order=:order&brand=:brand', storeController.productListFilter)
router.get('/brand=:brand&price=:price&order=:order&type=:type', storeController.productListFilter)

router.get('/type=:type&brand=:brand&order=:order', storeController.productListByTypeBrandOrder);
router.get('/brand=:brand&type=:type&order=:order', storeController.productListByTypeBrandOrder);
router.get('/type=:type&order=:order&brand=:brand', storeController.productListByTypeBrandOrder);
router.get('/brand=:brand&order=:order&type=:type', storeController.productListByTypeBrandOrder);

router.get('/type=:type&brand=:brand&price=:price', storeController.productListByTypeBrandPrice);
router.get('/brand=:brand&type=:type&price=:price', storeController.productListByTypeBrandPrice);
router.get('/type=:type&price=:price&brand=:brand', storeController.productListByTypeBrandPrice);
router.get('/brand=:brand&price=:price&type=:type', storeController.productListByTypeBrandPrice);

router.get('/type=:type&order=:order&price=:price', storeController.productListByTypeOrderPrice);
router.get('/brand=:brand&order=:order&price=:price', storeController.productListByBrandOrderPrice);
router.get('/type=:type&price=:price&order=:order', storeController.productListByTypeOrderPrice);
router.get('/brand=:brand&price=:price&order=:order', storeController.productListByBrandOrderPrice);

router.get('/type=:type&brand=:brand', storeController.productListByTypeAndBrand);
router.get('/brand=:brand&type=:type', storeController.productListByTypeAndBrand);
router.get('/type=:type&order=:order', storeController.productListByTypeAndOrder);
router.get('/brand=:brand&order=:order', storeController.productListByBrandAndOrder);
router.get('/type=:type&price=:price', storeController.productListByTypeAndPrice);
router.get('/brand=:brand&price=:price', storeController.productListByBrandAndPrice);

router.get('/type=:type', storeController.productListByType);

router.get('/brand=:brand', storeController.productListByBrand);

router.get('/id=:id', storeController.productDetailById);

module.exports = router;