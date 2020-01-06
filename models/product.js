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
    var query,
        condition = 0
        // console.log("models:")
        // console.log(key)
        // console.log(type)
        // console.log(brand)
        // console.log(price)
        // console.log(order)

    query = "select * from \"products\""

    if (key != undefined && condition == 0) {
        query += " where ";
        condition = 1;
    }
    if (type != undefined && condition == 0) {
        if (type.length > 0) {
            query += " where ";
            condition = 1;
        }
    }
    if (brand != undefined && condition == 0) {
        if (brand.length > 0) {
            query += " where ";
            condition = 1;
        }
    }
    if (price != null && condition == 0) {
        condition = 1;
        query += " where ";
    }

    condition = 0

    if (key != undefined) {
        query += "(to_tsvector(ten) @@ to_tsquery('" + key + "'))"
        if (type != undefined && condition == 0) {
            if (type.length > 0 && type[0] != "All") {
                condition = 1;
                query += " and ";
            }
        }
        if (brand != undefined && condition == 0) {
            if (brand.length > 0) {
                query += " and ";
                condition = 1;
            }
        }
        if (price != null && condition == 0) {
            query += " and ";
            condition = 1;
        }
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
            if (brand != undefined) {
                if (brand.length > 0)
                    query += " and ";
            }
            if (price != null)
                query += " and ";
        }
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
            if (price != null) {
                query += " and ";
            }
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
        //console.log(result.rows)
        callback(result.rows);
    });
}

module.exports.editProductById = function(form, callback) {
    query = "update \"products\" set ten = '" + form.ten + "', gia = '" + form.gia + "', mota = '" + form.mota +
        "', anh = '" + form.anh + "', loai = '" + form.loai + "', brand ='" + form.brand + "', kho ='" + form.kho + "' where id = '" + form.id + "'"
    pool.query(query, function(err, result) {
        callback(result)
    })
}

module.exports.removeProductById = function(id, callback) {
    query = "delete from \"products\" where id = '" + id + "'"
        // console.log(query)
    pool.query(query, function(err, result) {
        callback(result)
    })
}

module.exports.addProduct = function(form, callback) {
    const query = {
        text: 'insert into "products" values($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [form.id, form.ten, form.gia, form.mota, form.anh, form.brand, form.loai, form.kho],
    }

    pool.query(query, function(err, result) {
        // console.log(result)
        callback(result)
    })
}

module.exports.getProductImagesById = function(id, callback) {
    query = "select * from \"Product Images\" where id = '" + id + "'"
    pool.query(query, function(err, result) {
        // console.log("getProductImagesById:" + result.rows)
        callback(result.rows)
    })
}

module.exports.getProductBrands = function(callback) {
    query = "select distinct brand from \"products\""
    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

module.exports.insertComment = function(name, message, productid, callback) {
    query = 'insert into "comments" (productid, content, name) values (\'' + productid + '\', \'' + message + '\' , \'' + name + '\')';
    pool.query(query, function(err, result) {
        console.log(result);
        callback(result);
    });
}

module.exports.getCommentsByProductId = function(id, callback) {
    query = "select * from \"comments\" where productid = '" + id + "'";
    pool.query(query, function(err, result) {
        callback(result.rows)
    });
}