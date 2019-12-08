const { Pool } = require('pg')
const pool = new Pool({
    user: 'xljfmycrkdjihn',
    database: 'learn3',
    host: 'localhost',
    port: 5432
});

var bcrypt   = require('bcrypt-nodejs');

exports.insert = function(username, password, callback) {
    console.log(username)
    console.log(password)
    query = 'insert into "users" (username, password) values (\'' + username + '\', \'' + password + '\')';
    //console.log(query)
    pool.query(query, function(err, result) {
        // console.log(result);
        callback(result);
    });
}

exports.find = function(username, callback){
    query = 'select * from "users" where username = \'' + username + '\'';
    pool.query(query, function(err, result) {
        callback(result, err);
    });
}

exports.findID = function(id, callback){
    query = 'select * from "users" where id = \'' + id + '\'';
    pool.query(query, function(err, result) {
        callback(result, err);
    });
}

exports.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


exports.validPassword = async function(password, username, callback) {
    query = 'select * from "users" where username = \'' + username + '\'';
    promise = new Promise(function(resolve, _){
        pool.query(query, function(err, result) {
            resolve(bcrypt.compareSync(password, result.rows[0].password));
        });
    });
    result = await promise;
    return result;

    // var result = await pool.query(query);
    // console.log(result.rows[0].password);
    // bcrypt.compare(password, result.rows[0].password, function(err, res) {
    //     console.log('this is the real res: --> ' + res);
    //     return res;
    // });
};
