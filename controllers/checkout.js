var checkoutModel = require('../models/checkout')
var cartModel = require('../models/cart')
/*module.exports.getCheckout = function(req, res) {
    res.render('checkout');
};*/

exports.getCheckout = function(req, res) {
    cartModel.getCartByUser(req.user.username, function(cartitems){ 
        res.render('checkout', {
            user: req.user,
            items: cartitems,
        });
    })
}

exports.addOrder = function(req, res) {
    checkoutModel.addOrder(req.user.username, req.body['full-name'], req.body['email'], req.body['address'] , req.body['tel'], req.body['note'], function(orderid){ 
        cartModel.addOrderProduct(req.user.username, orderid, function(){
            checkoutModel.addOrderStatus(orderid, function(){
                res.redirect('/')
            })
        })
    })
}


exports.viewOrderList = function(req, res) {
    checkoutModel.getOrderList(req.user.username, function(orderitems){ 
        res.render('order-list', {
            user: req.user,
            items: orderitems,
        });
    })
}

exports.viewOrderDetail = function(req, res) {
    console.log('hello')
    console.log(req.body['id'])
    checkoutModel.getOrderDetail(req.body['id'], function(checkoutitems){ 
        checkoutModel.getOrderStatus(req.body['id'], function(status){
            console.log('hahaha')
                console.log(status)
                res.render('order-details', {
                user: req.user,
                items: checkoutitems,
                statuses: status,
            });
        })
    })
}

