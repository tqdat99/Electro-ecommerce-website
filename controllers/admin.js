var userModel = require('../models/user')

module.exports.userList = function(req, res) {
    userModel.getAllUser(function(users) {
        res.render('admin/manage-users', {
            Users: users
        })
    })
}