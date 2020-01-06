var orderModel = require('../models/order')

module.exports.orderList = function(req, res) {

    var perPage = 5
    var page = 1

    // console.log(req.params)
    // console.log(req.query.page)

    if (req.params['page'] != undefined)
        page = req.params['page']
    if (req.query.page != undefined)
        page = req.query.page

    orderModel.getOrderList(function(items) {
        onPageItems = items.slice(perPage * (page - 1), perPage * (page - 1) + perPage)
        res.render('profile', {
            user: req.user,
            Orders: onPageItems,
            Page: page,
            current: page,
            pages: Math.ceil(items.length / perPage)
        });
    })
}

module.exports.orderDetails = function(req, res) {
    orderid = req.query.orderid;
    orderModel.findOrderById(orderid, function(order) {
        orderModel.getOrderStatusById(orderid, function(status) {
            orderModel.getOrderProductsById(orderid, function(products) {
                var CreatedAt, Shipping, ShippedAt, CanceledAt
                for (i = 0; i < status.length; i++) {
                    if (status[i].status == '1')
                        CreatedAt = status[i].time
                    else if (status[i].status == '2')
                        Shipping = status[i].time
                    else if (status[i].status == '3')
                        ShippedAt = status[i].time
                    else if (status[i].status == '-1')
                        CanceledAt = status[i].time
                }
                res.render('manage-order-details', {
                    user: req.user,
                    Order: order,
                    Products: products,
                    CreatedAt: CreatedAt,
                    Shipping: Shipping,
                    ShippedAt: ShippedAt,
                    CanceledAt: CanceledAt,
                })
            })
        })
    })

}