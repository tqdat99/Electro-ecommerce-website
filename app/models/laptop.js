const { Pool } = require('pg')
const pool = new Pool({
    user: 'xljfmycrkdjihn',
    database: 'learn3',
    host: 'localhost',
    port: 5432
});

exports.getItems = function(callback) {
    query = 'select * from "Laptop" limit 4';
    pool.query(query, function(err, result) {
        callback(result);
    });
}

exports.getProductList = function(type, callback) {
    query = 'select * from \"' + type + '\"';
    pool.query(query, function(err, result) {
        callback(result);
    })
}

exports.getProductDetail = function(id, callback){
    queryLaptop = "select * from \"Laptop\" where id = '" + id + "'";
    queryDienthoai = "select * from \"Dienthoai\" where id = '" + id + "'";
    queryTivi = "select * from \"Tivi\" where id = '" + id + "'";
    pool.query(queryLaptop, function(err, result) {
        callback(result);
    })
    pool.query(queryDienthoai, function(err, result) {
        callback(result);
    })
    pool.query(queryTivi, function(err, result) {
        callback(result);
    })
}

exports.getProductBrand = function(type, brand, callback){
    query = 'select * from \"' + type + '\" where brand = \'' + brand + '\'';
    console.log(query)
    pool.query(query, function(err, result) {
        callback(result);
    });
}

/*router.get('/product-list-:type-:key', function(req, res) {
    query = 'select * from \"' + req.params["type"] + '\" where brand = \'' + req.params["key"] + '\'';

    pool.query(query, function(err, result) {
        console.log(query);
        console.log(req.params["type"]);
        console.log(req.params["brand"]);
        console.log(err, result);
        if (result.rowCount > 0) {
            res.render('store', { Items: result });
        }
    });
});*/
