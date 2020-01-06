var cartModel = require('../models/cart')
var userModel = require('../models/user')
var orderModel = require('../models/order')

module.exports.getCheckout = function(req, res) {
    cartModel.getCartByUser(req.user.username, function(cartitems) {
        userModel.findUserByUsername(req.user.username, function(userInfo) {
            res.render('checkout', {
                user: req.user,
                userInfo: userInfo,
                items: cartitems,
            });
        })
    })
}

module.exports.addOrder = function(req, res) {
    orderModel.addOrder(req.user.username, req.body['full-name'], req.body['email'], req.body['address'], req.body['tel'], req.body['note'], function(orderid) {
        cartModel.addOrderProduct(req.user.username, orderid, function() {
            res.redirect('/')
        })
    })
}