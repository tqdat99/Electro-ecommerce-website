var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    laptopQuery = 'select * from "Laptop" where id = \'' + id + '\'';
    tiviQuery = 'select * from "Tivi" where id = \'' + id + '\'';
    dienthoaiQuery = 'select * from "Dienthoai" where id = \'' + id + '\'';

    pool.query(laptopQuery, function(err, resultLaptop) {
        if (resultLaptop.rowCount > 0) {
            callback(resultLaptop.rows[0]);
        }
    });
    pool.query(tiviQuery, function(err, resultTivi) {
        if (resultTivi.rowCount > 0) {
            callback(resultTivi.rows[0]);
        }
    });
    pool.query(dienthoaiQuery, function(err, resultDienthoai) {
        if (resultDienthoai.rowCount > 0) {
            callback(resultDienthoai.rows[0]);
        }
    });
}

module.exports.getProductListByType = function(type, callback) {
    query = 'select * from \"' + type + '\"';
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByTypeAndBrand = function(type, brand, callback) {
    query = 'select * from \"' + type + '\" where brand = \'' + brand + '\'';
    pool.query(query, function(err, result) {
        callback(result);
    });
}