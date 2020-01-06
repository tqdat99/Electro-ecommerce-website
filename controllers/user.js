const bcrypt = require('bcrypt');
const passport = require('passport');
// var Passport = require('passport').Passport,
//     passport = new Passport()
const initialize = require('../models/passport');
initialize(passport);

var jwt = require('jsonwebtoken'),
    path = require('path'),
    async = require('async'),
    crypto = require('crypto'),
    _ = require('lodash'),
    hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'electroecom@gmail.com',
    pass = process.env.MAILER_PASSWORD || 'electro123456',
    nodemailer = require('nodemailer');

var ejs = require("ejs");

var forgetPasswordUser;

verifyingUser = {
    username: "",
    password: "",
    email: "",
    fullname: "",
    birthday: "",
    phone: "",
    address: ""
}

var smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
});

var userModel = require('../models/user');
var orderModel = require('../models/order');

module.exports.registerFormGet = function(req, res) {
    res.render('register', {
        msg: '',
        user: req.user
    });
}

module.exports.registerVerifying = function(req, res) {
    res.render('verify-pending', {
        user: req.user,
    })
}

module.exports.addUser = function(req, res) {
    userModel.addUser(verifyingUser)
    res.redirect('/user/login')
}

module.exports.registerFormPost = async function(req, res, next) {
    var valid = true;
    verifyingUser.username = req.body.username
    verifyingUser.password = req.body.password
    verifyingUser.email = req.body.email
    verifyingUser.fullname = req.body.fullname
    verifyingUser.birthday = req.body.birthday
    verifyingUser.phone = req.body.phone
    verifyingUser.address = req.body.address

    var password = req.body.password,
        username = req.body.username

    //console.log(valid)
    userModel.findUserByUsername(username, function(foundUser) {
        userModel.validatePassword(password, function(ifValid) {
            if (foundUser != null) {
                //console.log(foundUser)
                res.render('register', {
                    msg: 'Tên tài khoản đã tồn tại',
                    user: req.user
                })
            } else if (!ifValid) {
                //console.log(ifValid)
                //console.log('Mật khẩu phải có ít nhất 6 ký tự')
                return res.render('register', {
                    msg: 'Mật khẩu phải có ít nhất 6 ký tự',
                    user: req.user
                })
            } else {
                async.waterfall([
                    function(done) {
                        crypto.randomBytes(20, function(err, buffer) {
                            var token = buffer.toString('hex');
                            done(err, token);
                        });
                    },
                    function(token, done) {
                        console.log(req.body.fullname, req.body.email)
                        console.log(req.headers.host + '/user/verify?token=' + token)
                        ejs.renderFile(__dirname.replace("\controllers", "") + "/public/templates/verify-email.ejs", {
                            name: req.body.fullname,
                            url: req.headers.host + '/user/verify?token=' + token,
                        }, function(err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                var mainOptions = {
                                    from: email,
                                    to: req.body.email,
                                    subject: '[Electro] Kích hoạt tài khoản',
                                    html: data
                                };
                                //console.log(mainOptions)
                                smtpTransport.sendMail(mainOptions, function(err, info) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.redirect('/user/verifying')
                                        console.log('Message sent');
                                    }
                                });
                            }
                        });
                    }
                ], function(err) {
                    return res.status(422).json({ message: err });
                });
                res.redirect('/user/verifying')
            }
        })
    })
}

module.exports.passwordForget = function(req, res) {
    async.waterfall([
        function(done) {
            userModel.findUserByUsername(req.body.username, function(user) {
                if (user) {
                    forgetPasswordUser = user;
                    done(null, user)
                        //console.log(user)
                } else {
                    res.render('forget-password-form', { msg: "Tài khoản không tồn tại" })
                }
            })
        },
        function(user, done) {
            crypto.randomBytes(20, function(err, buffer) {
                var token = buffer.toString('hex');
                done(err, user, token);
            });
        },
        function(user, token, done) {
            ejs.renderFile(__dirname.replace("\controllers", "") + "/public/templates/forgot-password-email.ejs", {
                name: user.fullname,
                url: req.headers.host + '/user/verify?token=' + token,
            }, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var mainOptions = {
                        from: email,
                        to: user.email,
                        subject: '[Electro] Reset mật khẩu',
                        html: data
                    };
                    smtpTransport.sendMail(mainOptions, function(err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/user/forget-password-pending')
                            console.log('Message sent');
                        }
                    });
                }
            });
        }
    ], function(err) {
        return res.status(422).json({ message: err });
    });
};

module.exports.profile = function(req, res) {
    req.user.birthday = req.user.birthday.substring(0, 10)
    userModel.findUserByUsername(req.user.username, function(userInfo) {
        userInfo.birthday = new Date(userInfo.birthday).toISOString().substring(0, 10);

        var perPage = 5
        var page = 1

        // console.log(req.params)
        // console.log(req.query.page)

        if (req.params['page'] != undefined)
            page = req.params['page']
        if (req.query.page != undefined)
            page = req.query.page

        orderModel.getOrderListByUsername(req.query.username, function(items) {
            onPageItems = items.slice(perPage * (page - 1), perPage * (page - 1) + perPage)
            res.render('profile', {
                user: req.user,
                userInfo: userInfo,
                Orders: onPageItems,
                Page: page,
                current: page,
                pages: Math.ceil(items.length / perPage)
            });
        })
    })
}

module.exports.profileEdit = function(req, res) {
    userModel.editUserByUsername(req.query.username, req.body, function(result) {
        res.redirect('/user/profile?username=' + req.query.username)
    })
}

module.exports.logInFormGet = function(req, res) {
    res.render('login', {
        user: req.user
    })
}

module.exports.logInFormPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
})

module.exports.logOut = function(req, res) {
    req.logout()
    res.redirect('/')
}

module.exports.checkAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}

module.exports.checkNotAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports.passwordForgetForm = function(req, res) {
    res.render('forget-password-form', {
        user: req.user,
        msg: ""
    });
};

module.exports.passwordForgetPending = function(req, res) {
    res.render('forget-password-pending', {
        user: req.user,
    });
};

module.exports.passwordResetForm = function(req, res) {
    res.render('reset-password-form', {
        user: req.user,
        msg: ''
    });
};

module.exports.passwordReset = function(req, res) {
    var valid = true
    var username = forgetPasswordUser.username,
        password = req.body.password,
        retype = req.body.retype

    form = {
        username: username,
        password: password,
        retype: retype,
    }

    if (password != retype) {
        //console.log('Mật khẩu không trùng khớp.')
        return res.render('reset-password-form', {
            msg: 'Mật khẩu không trùng khớp',
        })
    }

    userModel.validatePassword(password, function(ifValid) {
        if (!ifValid) {
            //console.log('Mật khẩu phải có ít nhất 6 ký tự')
            return res.render('reset-password-form', {
                msg: 'Mật khẩu phải có ít nhất 6 ký tự',
            })
        } else {
            userModel.changePasswordByUsername(username, password, function(result) {
                //console.log('Đã thay đổi password')
                res.redirect('/user/login')
            })
        }
    })
};

module.exports.passwordForget = function(req, res) {
    async.waterfall([
        function(done) {
            userModel.findUserByUsername(req.body.username, function(user) {
                if (user) {
                    forgetPasswordUser = user;
                    done(null, user)
                        //console.log(user)
                } else {
                    res.render('forget-password-form', { msg: "Tài khoản không tồn tại" })
                }
            })
        },
        function(user, done) {
            crypto.randomBytes(20, function(err, buffer) {
                var token = buffer.toString('hex');
                done(err, user, token);
            });
        },
        function(user, token, done) {
            ejs.renderFile(__dirname.replace("\controllers", "") + "/public/templates/forgot-password-email.ejs", {
                name: user.fullname,
                url: req.headers.host + '/user/reset-password?token=' + token,
            }, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var mainOptions = {
                        from: email,
                        to: user.email,
                        subject: '[Electro] Reset mật khẩu',
                        html: data
                    };
                    console.log(mainOptions);
                    smtpTransport.sendMail(mainOptions, function(err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/user/forget-password-pending')
                            console.log('Message sent');
                        }
                    });
                }
            });
        }
    ], function(err) {
        return res.status(422).json({ message: err });
    });
};