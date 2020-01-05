var cartModel = require('../models/cart')

exports.getCart = function(req, res) {
	cartModel.getCartByUser(req.user.username, function(cartitems){ 
        res.render('cart', {
        	user: req.user,
        	items: cartitems,
    	});
    })
}

exports.getCartCount = function(req, res) {
	cartModel.getCartByUser(req.user.username, function(cartitems){ 
    	res.setHeader('Content-Type', 'application/json');
	    if (cartitems) {
	    	res.end(JSON.stringify(cartitems.length));
	    } else {
	    	res.end(JSON.stringify(0));
	    }
    })
}

exports.getCartSubview = function(req, res) {
	cartModel.getCartByUser(req.user.username, function(cartitems){ 
        res.render('cart-subview', {
        	items: cartitems,
    	});
    })
}

exports.updateCart = function(req, res) {
	cartModel.getCartByUser(req.user.username, function(cartitems){ 
		var index = 0
		var count = cartitems.length
		var f = function(){}

		cartitems.forEach(function(item){
			index += 1
			console.log(index)
			console.log('stt-' + item.cartid + ':' + req.body['stt-' + item.cartid])

			if (index == count) {
				f = function() {
        			res.redirect('back')
				}
			}

			if (req.body['stt-' + item.cartid] == 0) {
				cartModel.deleteCartItem(item.cartid, f)
			} else {
				cartModel.updateCartItem(item.cartid, req.body['stt-' + item.cartid], f)
			}
		})
    })
}

exports.addItem = function(req, res) {
	console.log(req.body)
	cartModel.addCartItem(req.user.username, req.body['stt'], function(cartitems){ 
        res.redirect('/cart')
    })
}

exports.import = function(req, res) {
	req.body['items'].forEach(function(item){
		for(var i =0; i < item.quantity; i++) {
			cartModel.addCartItem(req.user.username, item.productid, function(){})
		}
	})
	res.send('ok')
}

