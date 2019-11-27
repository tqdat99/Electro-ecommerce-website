var laptops = require('../models/laptop')

exports.productlist = function(req,res) {
	laptops.getProductList(req.params['type'], function(items) {
		res.render('store', { Items: items });
	})
}

exports.productdetail = function(req, res){
	laptops.getProductDetail(req.params['id'], function(items){
		if (items.rows.length > 0) {
			res.render('product-details', { item: items.rows[0] });
		}
	})
}

exports.productlistBrand = function(req, res){
	laptops.getProductBrand(req.params['type'], req.params['brand'], function(items){
		res.render('store', {Items: items});
	})
}
