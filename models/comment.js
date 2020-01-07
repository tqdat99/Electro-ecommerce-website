var database = require('./database')
var pool = database.pool;

module.exports.insertComment = function(name, message, productid, time, callback) {
    query = 'insert into "comments" (productid, username, content, name, date) values (\'' + productid + '\', null, \'' + message + '\' , \'' + name + '\', \'' + time + '\')';
    pool.query(query, function(err, result) {
        callback(result);
    });
}


module.exports.getCommentsByProductId = function(id, callback) {
    query = "select * from \"comments\" where productid = '" + id + "' order by commentid desc";
    pool.query(query, function(err, result) {
        callback(result.rows)
    });
}