var database = require('./database')
var pool = database.pool;

module.exports.getProductDetailById = function(id, callback) {
    query = "select * from \"products\" where id = '";
    pool.query(query, function(err, result) {
        callback(result);
    });
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
module.exports.getProductListByType = function(type, page, callback) {
    query = "select * from \"products\" where loai = '" + type + "' limit 9 offset " + (page - 1) * 9;
    pool.query(query, function(err, result) {
        callback(result);
    })
}

module.exports.getProductListByTypeAndBrand = function(type, brand, page, callback) {
    query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' limit 9 offset " + (page - 1) * 9;
=======
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
=======
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
>>>>>>> parent of 5e58dde... Filter & Pagination (Dat)
    });
}

module.exports.getProductOrder = function(type, brand, order, page, callback) {
    var query;
    if (brand != 'undefined')
        query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' ORDER BY gia " + order + " limit 9 offset " + (page - 1) * 9;
    else
        query = "select * from \"products\" where loai = '" + type + "' ORDER BY gia " + order + " limit 9 offset " + (page - 1) * 9;
>>>>>>> parent of 5e58dde... Filter & Pagination (Dat)
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
>>>>>>> parent of 5e58dde... Filter & Pagination (Dat)
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

/*module.exports.getProductFilter  = function(type, brand, price, order, callback){
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

    /*if (brand != 'undefined')
        query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' ORDER BY gia " + order + "";
    else
        query = "select * from \"products\" where loai = '" + type + "' ORDER BY gia " + order + "";
    pool.query(query, function(err, result) {
        callback(result);
    });
}
module.exports.getProductOrder  = function(type, brand, order, callback){
    var query;
    if (brand != 'undefined')
        query = "select * from \"products\" where brand = '" + brand + "' and loai = '" + type + "' ORDER BY gia " + order + "";
    else
        query = "select * from \"products\" where loai = '" + type + "' ORDER BY gia " + order + "";
    pool.query(query, function(err, result) {
        callback(result);
    });
}
*/