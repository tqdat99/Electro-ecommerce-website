var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '";
    pool.query(query, function(err, result) {
        callback(result.rows[0]);
    });
}

module.exports.getProductListByType = function(type, callback) {

    var typelist = type.split(',');
    var qType = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    query = "select * from \"products\" where loai in ( " + qType + " )";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByBrand = function(brand, callback) {
    var brandlist = brand.split(',');
    var qBrand = "";

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    query = "select * from \"products\" where brand in (" + qBrand + ")";
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByTypeAndBrand = function(type, brand, callback) {
    var typelist = type.split(',');
    var brandlist = brand.split(',');
    var qType = "";
    var qBrand = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query = "select * from \"products\" where loai in ( " + qType + " ) and brand in (" + qBrand + ")";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductTypeAndPrice = function(type, price, callback) {

    var typelist = type.split(',');
    var qType = "";
    var pricelist = price.split(',');

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    var query;
    query = "select * from \"products\" where loai in ( " + qType + " ) and gia between " + pricelist[0] + " and " + pricelist[1];
    pool.query(query, function(err, result) {
        console.log(result)
        callback(result.rows);
    });
}

module.exports.getProductBrandAndPrice = function(brand, price, callback) {

    var brandlist = brand.split(',');
    var qBrand = "";
    var pricelist = price.split(',');

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query;
    query = "select * from \"products\" where brand in ( " + qBrand + " ) and gia between " + pricelist[0] + " and " + pricelist[1];
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductTypeAndOrder = function(type, order, callback) {

    var typelist = type.split(',');
    var qType = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    var query;
    query = "select * from \"products\" where loai in ( " + qType + " ) ORDER BY gia " + order + "";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductBrandAndOrder = function(brand, order, callback) {

    var brandlist = brand.split(',');
    var qBrand = "";

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);


    var query;
    query = "select * from \"products\" where brand in ( " + qBrand + " ) ORDER BY gia " + order + "";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductTypeBrandOrder = function(type, brand, order, callback) {
    var typelist = type.split(',');
    var brandlist = brand.split(',');
    var qType = "";
    var qBrand = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query = "select * from \"products\" where loai in ( " + qType + " ) and brand in (" + qBrand + ") ORDER BY gia " + order + "";

    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductTypeBrandPrice = function(type, brand, price, callback) {
    var typelist = type.split(',');
    var brandlist = brand.split(',');
    var pricelist = price.split(',');
    var qType = "";
    var qBrand = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query = "select * from \"products\" where loai in ( " + qType + " ) and brand in (" + qBrand + ")  and gia between " + pricelist[0] + " and " + pricelist[1] + "";

    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductTypeOrderPrice = function(type, order, price, callback) {
    var typelist = type.split(',');
    var pricelist = price.split(',');
    var qType = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    var query = "select * from \"products\" where loai in ( " + qType + " )  and gia between " + pricelist[0] + " and " + pricelist[1] + " ORDER BY gia " + order + "";

    console.log(query)

    pool.query(query, function(err, result) {
        callback(result);
    });
}

module.exports.getProductBrandOrderPrice = function(brand, order, price, callback) {
    var brandlist = brand.split(',');
    var pricelist = price.split(',');
    var qBrand = "";

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query = "select * from \"products\" where brand in (" + qBrand + ")  and gia between " + pricelist[0] + " and " + pricelist[1] + " ORDER BY gia " + order + "";

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

module.exports.getProductFilter = function(type, brand, price, order, callback) {
    var typelist = type.split(',');
    var brandlist = brand.split(',');
    var pricelist = price.split(',');
    var qType = "";
    var qBrand = "";

    for (const element of typelist) {
        qType = qType + "'" + element + "'" + ',';
    }
    qType = qType.substring(0, qType.length - 1);

    for (const element of brandlist) {
        qBrand = qBrand + "'" + element + "'" + ',';
    }
    qBrand = qBrand.substring(0, qBrand.length - 1);

    var query = "select * from \"products\" where loai in ( " + qType + " ) and brand in (" + qBrand + ") and gia between " + pricelist[0] + " and " + pricelist[1] + " ORDER BY gia " + order + "";

    pool.query(query, function(err, result) {
        callback(result);
    });
}