var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '" + id + "'";
    pool.query(query, function(err, result) {
        console.log(result.ten)
        callback(result);
    });
}

module.exports.getProductListByType = function(type, callback) {
    query = "select * from \"products\" where loai = '" + type + "'";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByTypeAndBrand = function(type, brand, callback) {
    query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "'";
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