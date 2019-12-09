const { Pool } = require('pg')
const pool = new Pool({
    user: 'anhthu',
    database: 'dbat',
    host: 'localhost',
    port: 5432
});

exports.getItems = function(callback) {
    query = 'select * from "products" limit 4';
    pool.query(query, function(err, result) {
        callback(result);
    });
}

exports.getRelatedItems = function(type, callback) {
    query = "select * from \"products\" where loai = '" + type + "' limit 4";
    console.log(query)
    pool.query(query, function(err, result) {
        callback(result);
    });
}

exports.getProductDetail = function(id, callback){
    query = "select * from \"products\" where id = '" + id + "'";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

exports.getProductList = function(type, callback) {
    query = "select * from \"products\" where loai = '" + type + "'";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

exports.getProductBrand = function(type, brand, callback){
    query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "'";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

exports.getProductOrder  = function(type, brand, order, callback){
    var query;
    if (brand != 'undefined')
        query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' ORDER BY gia " + order + "";
    else
        query = "select * from \"products\" where loai = '" + type + "' ORDER BY gia " + order + "";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

