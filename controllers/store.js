var productModel = require('../models/product')

module.exports.productListByType = function(req, res) {
    productModel.getProductListByType(req.params['type'], function(items) {
        res.render('store', { Items: items , Type: req.params['type'], Brand: 'undefined'});
    })
}

module.exports.productListByTypeAndBrand = function(req, res) {
    productModel.getProductListByTypeAndBrand(req.params['type'], req.params['brand'], function(items) {
        res.render('store', { Items: items , Type: req.params['type'], Brand: req.params['brand']});
    })
}

module.exports.productDetailById = function(req, res) {
    productModel.getProductDetailById(req.params['id'], function(item) {
        if (item.rows.length > 0) {
			res.render('product-details', { item: item.rows[0]});
		}
    })
}

module.exports.productlistOrder = function(req, res){
	productModel.getProductOrder(req.params['type'], req.params['brand'], req.params['order'], function(items){
		res.render('store', {Items: items , Type: req.params['type'], Brand: req.params['brand'], User: req.user}); // ????????
	})
}

