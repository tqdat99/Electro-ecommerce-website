var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '";
    pool.query(query, function(err, result) {
        callback(result.rows[0]);
    });
}

module.exports.getProductList = function(type, brand, order, callback) {
    var query

    console.log("models:")
    console.log(type)
    console.log(brand)

    query = "select * from \"products\" where "
    if (type != undefined)
        if (type.length > 0) {
            query += "(";
            for (i = 0; i < type.length; i++) {
                query += "loai = '" + type[i] + "'";
                if (i != type.length - 1)
                    query += " or ";
            }
            query += ")";
        }
    if (brand != undefined && type != undefined && brand.length > 0 && type.length > 0) {
        query += " and ";
    }
    if (brand != undefined)
        if (brand.length > 0) {
            for (i = 0; i < brand.length; i++) {
                query += "brand = '" + brand[i] + "'";
                if (i != brand.length - 1)
                    query += " or ";
            }
        }
    query += " ORDER BY gia " + order;

    console.log(query)

    pool.query(query, function(err, result) {
        console.log(result)
        callback(result.rows);
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