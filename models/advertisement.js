var database = require('./database')
var pool = database.pool;

module.exports.getAllActiveAdvertisements = function(callback) {
    query = "select * from \"Advertisements\" where status = 'active'"
    pool.query(query, function(err, result) {
        callback(result.rows)
    })
}