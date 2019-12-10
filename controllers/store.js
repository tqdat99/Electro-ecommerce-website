var productModel = require('../models/product')

module.exports.productListByType = function(req, res) {
    productModel.getProductListByType(req.params['type'], function(items) {
        res.render('store', {
            Items: items,
            Type: req.params['type'],
            Brand: 'undefined',
            user: req.user
        });
    })
}

module.exports.productListByTypeAndBrand = function(req, res) {
    productModel.getProductListByTypeAndBrand(req.params['type'], req.params['brand'], function(items) {
        res.render('store', {
            Items: items,
            Type: req.params['type'],
            Brand: req.params['brand'],
            user: req.user
        });
    })
}

module.exports.productDetailById = function(req, res) {
    productModel.getProductDetailById(req.params['id'], function(item) {
        if (item.rows.length > 0) {
            productModel.getRelatedItems(item.rows[0].loai, function(items) {
                res.render('product-details', {
                    item: item.rows[0],
                    Items: items,
                    user: req.user
                });
            })
        }
    })
}

module.exports.productlistOrder = function(req, res) {
    productModel.getProductOrder(req.params['type'], req.params['brand'], req.params['order'], function(items) {
        res.render('store', {
            Items: items,
            Type: req.params['type'],
            Brand: req.params['brand'],
            user: req.user,
        }); // ????????
    })
}