var database = require('./database')
var pool = database.pool;
var cartModel = require('./cart')

module.exports.addOrder = function(username, name, email, address, phone, note, callback) {
    orderid = (new Date()).getTime();
    cartModel.getSumPrice(username, function(sum) {
        var s = JSON.stringify(sum[0].sum);
        var tong = JSON.parse(s);
        query = 'insert into "order" (orderid, username, name, email, address, phone, note, sum) values (\'' + orderid + '\', \'' + username + '\',\'' + name + '\' , \'' + email + '\', \'' + address + '\', \'' + phone + '\' , \'' + note + '\', \'' + tong + '\')';
        console.log(query)
        pool.query(query, function(err, result) {
            callback(orderid)
        })
    });
}

module.exports.getOrderListByUsername = function(username, callback) {
    query = "select * from \"order\" where username ='" + username + "'"
    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

module.exports.findOrderById = function(id, callback) {
    query = "select * from \"order\" where orderid = '" + id + "'"
    pool.query(query, function(err, result) {
        callback(result.rows[0])
    })
}

module.exports.getOrderProductsById = function(id, callback) {
    query = "select * from products inner join order_product on products.id = order_product.productid where orderid = '" + id + "'"
    pool.query(query, function(err, result) {
        console.log(query)
        callback(result.rows)
    })
}

module.exports.getOrderStatusById = function(id, callback) {
    query = "select * from \"order_status\" where orderid = '" + id + "'"
    console.log(query)
    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}