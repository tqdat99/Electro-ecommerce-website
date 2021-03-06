var database = require('./database')
var pool = database.pool;

module.exports.getItems = function(callback) {
    query = "select * from \"products\" limit 4";
    pool.query(query, function(err, result) {
        callback(result.rows);
    });
}

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '" + id + "'";
    pool.query(query, function(err, result) {
        callback(result.rows[0])
    });
}

module.exports.getProductList = function(type, brand, price, order, callback) {
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
            query += "(";
            for (i = 0; i < brand.length; i++) {
                query += "brand = '" + brand[i] + "'";
                if (i != brand.length - 1)
                    query += " or ";
            }
            query += ")";
        }

    if (((type != undefined && type.length > 0) || (brand.length > 0 && brand != undefined)) && price != null) {
        query += " and ";
    }
    if (price != null) {
        var range = price.split("-");
        if (range.length == 2) {
            query += "gia between " + range[0] + " and " + range[1];
        } else
            query += "gia > 30000000 ";
    }

    query += " ORDER BY gia " + order;

    console.log(query)
    pool.query(query, function(err, result) {
        callback(result.rows);
    });
}

module.exports.insertComment = function(name, message, productid, time, callback){
    query = 'insert into "comments" (productid, content, name, date) values (\'' + productid + '\', \'' + message + '\' , \'' + name + '\', \'' + time + '\')';
    pool.query(query, function(err, result) {
        console.log(result);
        callback(result);
    });
}

module.exports.getCommentsByProductId = function(id, callback) {
    query = "select * from \"comments\" where productid = '" + id + "' order by commentid desc";
    pool.query(query, function(err, result) {
        console.log(result)
        callback(result.rows)
    });
}

module.exports.getProductSearch = function(search, callback){
    query = 'select * from "products" where document_vectors @@ plainto_tsquery(\'' + search + '\')';
    pool.query(query, function(err, result) {
        callback(result.rows)
    });
}