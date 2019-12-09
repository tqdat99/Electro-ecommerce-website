var laptops = require('../models/laptop')

exports.productdetail = function(req, res){
	laptops.getProductDetail(req.params['id'], function(item){
		if (item.rows.length > 0) {
			laptops.getRelatedItems(item.rows[0].loai, function(items) {
				res.render('product-details', { item: item.rows[0] , User: req.user , Items: items});
			})
		}
	})
}

exports.productlist = function(req,res) {
	laptops.getProductList(req.params['type'], function(items) {
		res.render('store', { Items: items , Type: req.params['type'], Brand: 'undefined', User: req.user });
	})
}

exports.productlistBrand = function(req, res){
	laptops.getProductBrand(req.params['type'], req.params['brand'], function(items){
		res.render('store', {Items: items , Type: req.params['type'], Brand: req.params['brand'], User: req.user});
	})
}

exports.productlistOrder = function(req, res){
	laptops.getProductOrder(req.params['type'], req.params['brand'], req.params['order'], function(items){
		res.render('store', {Items: items , Type: req.params['type'], Brand: req.params['brand'], User: req.user}); // ????????
	})
}



