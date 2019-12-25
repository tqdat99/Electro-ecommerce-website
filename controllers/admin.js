var userModel = require('../models/user')

module.exports.userList = function(req, res) {
    var perPage = 5
    var page = 1

    console.log(req.params)
    console.log(req.query.page)

    if (req.params['page'] != undefined)
        page = req.params['page']
    if (req.query.page != undefined)
        page = req.query.page

    userModel.getAllUser(function(items) {
        onPageItems = items.slice(perPage * (page - 1), perPage * (page - 1) + perPage)
        res.render('admin/manage-users', {
            Users: onPageItems,
            Page: page,
            user: req.user,
            current: page,
            pages: Math.ceil(items.length / perPage)
        });
    })
}

module.exports.userInfo = function(req, res) {
    username = req.query.username
    userModel.findUserByUsername(username, function(user) {
        res.render('admin/manage-users-details', {
            user: user,
        });
    })
}

module.exports.userLock = function(req, res) {
    username = req.query.username
    redirect = "manage-users-details?username=" + username
    userModel.lockUser(username,
        userModel.findUserByUsername(username, function(user) {
            res.redirect(redirect)
        })
    )
}

module.exports.userUnlock = function(req, res) {
    username = req.query.username
    redirect = "manage-users-details?username=" + username
    userModel.unlockUser(username,
        userModel.findUserByUsername(username, function(user) {
            res.redirect(redirect)
        })
    )
}

module.exports.profileEdit = function(req, res) {
    console.log("profileEdit:")
    console.log(req.body)
    userModel.editUserByUsername(req.body)
    res.render('manage-users-edit', {
        msg: '',
        user: req.user
    });
}