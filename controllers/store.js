var productModel = require('../models/product')
    //controller neu co thi kiem tra du lieu ma thoi!
module.exports.productListByType = function(req, res) {
    productModel.getProductListByType(req.params['type'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user
        });
    })
}

module.exports.productListByBrand = function(req, res) {
    productModel.getProductListByBrand(req.params['brand'], function(items) {
        res.render('store', {
            Items: items,
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

module.exports.productListByTypeAndPrice = function(req, res) {
    productModel.getProductTypeAndPrice(req.params['type'], req.params['price'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByBrandAndPrice = function(req, res) {
    productModel.getProductBrandAndPrice(req.params['brand'], req.params['price'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByTypeAndOrder = function(req, res) {
    productModel.getProductTypeAndOrder(req.params['type'], req.params['order'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByBrandAndOrder = function(req, res) {
    productModel.getProductBrandAndOrder(req.params['brand'], req.params['order'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByTypeAndBrand = function(req, res) {
    productModel.getProductListByTypeAndBrand(req.params['type'], req.params['brand'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user
        });
    })
}

module.exports.productListByTypeBrandOrder = function(req, res) {
    productModel.getProductTypeBrandOrder(req.params['type'], req.params['brand'], req.params['order'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByTypeBrandPrice = function(req, res) {
    productModel.getProductTypeBrandPrice(req.params['type'], req.params['brand'], req.params['price'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByTypeOrderPrice = function(req, res) {
    productModel.getProductTypeOrderPrice(req.params['type'], req.params['order'], req.params['price'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListByBrandOrderPrice = function(req, res) {
    productModel.getProductBrandOrderPrice(req.params['brand'], req.params['order'], req.params['price'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}

module.exports.productListFilter = function(req, res) {
    productModel.getProductFilter(req.params['type'], req.params['brand'], req.params['price'], req.params['order'], function(items) {
        res.render('store', {
            Items: items,
            user: req.user,
        });
    })
}