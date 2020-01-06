var database = require('./database')
var pool = database.pool;

module.exports.getCartByUser = function(username, callback) {
    query = 'select * from "cartItem" inner join "products" on "cartItem".productid = "products".id  where username = \'' + username + '\'';
    pool.query(query, function(err, result) {
        callback(result.rows);
    });
}

module.exports.getSumPrice = function(username, callback) {
    query = 'select sum(quantity * gia) from "cartItem" inner join "products" on "cartItem".productid = "products".id where username = \'' + username + '\'';
    pool.query(query, function(err, result) {
        callback(result.rows);
    });
}

module.exports.updateCartItem = function(cartid, quantity, callback) {
    query = 'update "cartItem" set quantity = \'' + quantity + '\' where cartid = \'' + cartid + '\'';
    pool.query(query, function(err, result) {
        callback();
    });
}

module.exports.deleteCartItem = function(cartid, callback) {
    query = 'delete from "cartItem" where cartid = \'' + cartid + '\'';
    pool.query(query, function(err, result) {
        callback();
    });
}

module.exports.addCartItem = function(username, productid, callback) {

    queryCheck = 'select * from "cartItem" where productid = \'' + productid + '\' and username = \'' + username + '\'';

    pool.query(queryCheck, function(err, result) {
        if (result.rows.length == 0) {
            queryInsert = 'insert into "cartItem" (productid, username, quantity) values (\'' + productid + '\',\'' + username + '\', 1)';
            pool.query(queryInsert, function(err, result) {
                callback(result.rows);
            });
        } else {
            queryUpdate = 'update "cartItem" set quantity = quantity + 1 where productid = \'' + productid + '\' and username = \'' + username + '\'';
            pool.query(queryUpdate, function(err, result) {
                callback(result.rows);
            });
        }
    })
}

module.exports.addOrderProduct = function(username, orderid, callback) {
    query = 'select * from "cartItem" where username = \'' + username + '\'';
    pool.query(query, function(err, result) {
        result.rows.forEach(function(item) {
            queryInsert = 'insert into "order_product" (productid, quantity, orderid) values (\'' + item.productid + '\', \'' + item.quantity + '\', \'' + orderid + '\')';
            pool.query(queryInsert, function(err, result) {
                module.exports.deleteCartItem(item.cartid, function() {})
            });
        });
        callback()
    });
}