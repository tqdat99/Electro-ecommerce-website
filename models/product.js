const { Pool, Client } = require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
})

function productListByType(type, callback) {
    query = 'select * from \"' + type + '\"';
    pool.query(query, function(err, result) {
        if (result.rowCount > 0) {
            callback(result);
        }
    })
}

function productListByTypeAndBrand(type, brand, callback) {
    query = 'select * from \"' + type + '\" where brand = \'' + brand + '\'';
    pool.query(query, function(err, result) {
        if (result.rowCount > 0) {
            callback(result);
        }
    });
}

function findProductById(id, callback) {
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

module.exports.productListByType = productListByType;
module.exports.productListByTypeAndBrand = productListByTypeAndBrand;
module.exports.findProductById = findProductById;