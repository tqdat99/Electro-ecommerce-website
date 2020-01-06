var database = require('./database')
var pool = database.pool;

module.exports.insertComment = function(name, message, productid, time, callback) {
    console.log(time)
    query = 'insert into "comments" (productid, username, content, name, date) values (\'' + productid + '\', \'' + message + '\' , \'' + name + '\', \'' + time + '\')';
    pool.query(query, function(err, result) {
        console.log(query)
        callback(result);
    });
}

module.exports.getCommentsByProductId = function(id, callback) {
    query = "select * from \"comments\" where productid = '" + id + "' order by commentid desc";
    pool.query(query, function(err, result) {
        callback(result.rows)
    });
}