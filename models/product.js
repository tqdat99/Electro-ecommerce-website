var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductListByType = function(type, page, callback) {
    query = "select * from \"products\" where loai = '" + type + "' limit 9 offset " + (page - 1) * 9;
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByTypeAndBrand = function(type, brand, page, callback) {
    query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' limit 9 offset " + (page - 1) * 9;
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductOrder = function(type, brand, order, page, callback) {
    var query;
    if (brand != 'undefined')
        query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' ORDER BY gia " + order + " limit 9 offset " + (page - 1) * 9;
    else
        query = "select * from \"products\" where loai = '" + type + "' ORDER BY gia " + order + " limit 9 offset " + (page - 1) * 9;
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getItems = function(callback) {
    query = 'select * from "products" limit 4';
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getRelatedItems = function(type, callback) {
    query = "select * from \"products\" where loai = '" + type + "' limit 4";
    console.log(query)
    pool.query(query, function(err, result) {
        callback(result);
    });
}

/*exports.getItems = function(callback) {
    query = 'select * from "products" limit 4';
    pool.query(query, function(err, result) {
        callback(result);
    });
}

exports.getProductList = function(type, callback) {
    query = "select * from \"products\" where loai = '" + type + "'";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

exports.getProductDetail = function(id, callback){
    query = "select * from \"products\" where id = '" + id + "'";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

exports.getProductBrand = function(type, brand, callback){
    query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "'";
    console.log(query)
    pool.query(query, function(err, result) {
        callback(result);
    });
}*/