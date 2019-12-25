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

module.exports.getProductList = function(key, type, brand, price, order, callback) {
    var query
    console.log("models:")
    console.log(key)
    console.log(type)
    console.log(brand)
    console.log(price)
    console.log(order)

    query = "select * from \"products\" where "

    if (key != undefined) {
        query += "(to_tsvector(ten) @@ to_tsquery('" + key + "'))"
        if (type != undefined) {
            if (type.length > 0)
                query += " and ";
        } else if (brand != undefined) {
            if (brand.length > 0)
                query += " and ";
        } else if (price != null)
            query += " and ";
    }

    if (type != undefined) {
        if (type.length > 0) {
            query += "(";
            for (i = 0; i < type.length; i++) {
                query += "loai = '" + type[i] + "'";
                if (i != type.length - 1)
                    query += " or ";
            }
            query += ")";
        }
        if (brand != undefined) {
            if (brand.length > 0)
                query += " and ";
        } else if (price != null)
            query += " and ";
    }


    if (brand != undefined) {
        if (brand.length > 0) {
            query += "(";
            for (i = 0; i < brand.length; i++) {
                query += "brand = '" + brand[i] + "'";
                if (i != brand.length - 1)
                    query += " or ";
            }
            query += ")";
        }
        if (price != null) {
            query += " and ";
        }
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