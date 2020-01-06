var database = require('./database')
var pool = database.pool;

module.exports.getAllTypes = function(callback) {
    query = "select * from \"Product Types\" "
    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}

module.exports.getTypeById = function(id, callback) {
    query = "select * from \"Product Types\" where id = '" + id + "'"
        //console.log(query)
    pool.query(query, function(err, result) {
        // console.log("getProductImagesById:" + result.rows)
        callback(result.rows[0])
    })
}