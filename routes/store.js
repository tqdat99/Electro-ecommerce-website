var express = require('express')
var router = express.Router()

var store = require('../app/controllers/store_controller')

router.get('/product-list-:type-:brand-:order', store.productlistOrder)

router.get('/product-list-:type-:brand', store.productlistBrand)

router.get('/product-list-:type',store.productlist)

router.get('/details-:id', store.productdetail)

module.exports = router
