var userModel = require('../models/user')

module.exports.userList = function(req, res) {
    var perPage = 1
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

module.exports.profileEdit = function(req, res) {
    console.log("profileEdit:")
    console.log(req.body)
    userModel.editUserByUsername(req.body)
    res.render('manage-users-edit', {
        msg: '',
        user: req.user
    });
}