var database = require('./database')
var pool = database.pool;
var cartModel = require('./cart')

module.exports.addOrder= function(username, name, email, address, phone, note, callback) {
    orderid = (new Date()).getTime();
    cartModel.getSumPrice(username, function(sum){
    	var s = JSON.stringify(sum[0].sum);
		var tong = JSON.parse(s);
    	query = 'insert into "order" (orderid, username, name, email, address, phone, note, sum) values (\'' + orderid  + '\', \'' + username  + '\',\'' + name + '\' , \'' + email + '\', \'' + address + '\', \'' + phone + '\' , \'' + note + '\', \'' + tong + '\')';
		console.log(query)
		pool.query(query, function(err, result) {
	        callback(orderid)
		})
    });
}

module.exports.addOrderStatus= function(orderid, callback) {
    orderid = (new Date()).getTime()
    var status = 1;
    var time = new Date().toLocaleString()
	query = 'insert into "order_status" (orderid, status, time) values (\'' + orderid  + '\', \'' + status + '\', \'' + time + '\')';

	pool.query(query, function(err, result) {
        callback(orderid)
	})
}

module.exports.getOrderList= function(username, callback) {

query = 'select * from "order" inner join "order_status" on "order".orderid = "order_status".orderid  where username  = \'' + username + '\' and "order_status".status = (SELECT MAX (status) FROM "order_status")';

    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

module.exports.getOrderDetail= function(orderid, callback) {

query = 'select * from "order_product" inner join "products" on "order_product".productid = "products".id where "order_product".orderid = \'' + orderid + '\'';

    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

module.exports.getOrderStatus= function(orderid, callback) {

    query = 'select * from "order_status" where "order_status".orderid = \'' + orderid + '\'';

    console.log('how are u')
    console.log(query)

    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

