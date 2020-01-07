var cartModel = require('../models/cart')

module.exports.getCart = function(req, res) {
    if (req.user) {
        cartModel.getCartByUser(req.user.username, function(cartitems) {
            res.render('cart', {
                user: req.user,
                items: cartitems,
            });
        })
    } else {
        res.render('cart', {
            user: req.user,
        });
    }
}

module.exports.getCartCount = function(req, res) {
    cartModel.getCartByUser(req.user.username, function(cartitems) {
        res.setHeader('Content-Type', 'application/json');
        if (cartitems) {
            res.end(JSON.stringify(cartitems.length));
        } else {
            res.end(JSON.stringify(0));
        }
    })
}

module.exports.getCartSubview = function(req, res) {
    cartModel.getCartByUser(req.user.username, function(cartitems) {
        res.render('cart-subview', {
            items: cartitems,
        });
    })
}

module.exports.updateCart = function(req, res) {
    cartModel.getCartByUser(req.user.username, function(cartitems) {
        var index = 0
        var count = cartitems.length
        var f = function() {}

        cartitems.forEach(function(item) {
            index += 1
                //console.log(index)
                //console.log('stt-' + item.cartid + ':' + req.body['stt-' + item.cartid])

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

module.exports.addItem = function(req, res) {
    //console.log(req.body)
    cartModel.addCartItem(req.user.username, req.body['stt'], function(cartitems) {
        res.redirect('back');
    })
}

module.exports.import = function(req, res) {
    req.body['items'].forEach(function(item) {
        for (var i = 0; i < item.quantity; i++) {
            cartModel.addCartItem(req.user.username, item.productid, function() {})
        }
    })
    res.send('ok')
}