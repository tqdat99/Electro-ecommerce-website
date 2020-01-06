var express = require('express')
var router = express.Router()
router.use(express.static('public'))

var userController = require('../controllers/user')
var orderController = require('../controllers/order')

router.get('/register', userController.checkNotAuthenticated, userController.registerFormGet)
router.post('/register', userController.checkNotAuthenticated, userController.registerFormPost)

router.get('/verifying', userController.checkNotAuthenticated, userController.registerVerifying)
router.get('/verify', userController.checkNotAuthenticated, userController.addUser)

router.get('/login', userController.checkNotAuthenticated, userController.logInFormGet)
router.post('/login', userController.checkNotAuthenticated, userController.logInFormPost);

router.get('/change-password', userController.checkAuthenticated, userController.passwordChangeForm)
router.post('/change-password', userController.checkAuthenticated, userController.passwordChange)

router.get('/profile', userController.checkAuthenticated, userController.profile)
router.post('/profile', userController.checkAuthenticated, userController.profileEdit)

router.get('/order', userController.checkAuthenticated, orderController.orderDetails)

router.post('/logout', userController.checkAuthenticated, userController.logOut)

router.get('/forget-password', userController.checkNotAuthenticated, userController.passwordForgetForm)
router.post('/forget-password', userController.checkNotAuthenticated, userController.passwordForget)
router.get('/forget-password-pending', userController.checkNotAuthenticated, userController.passwordForgetPending)

router.get('/reset-password', userController.checkNotAuthenticated, userController.passwordResetForm)
router.post('/reset-password', userController.checkNotAuthenticated, userController.passwordReset);

module.exports = router;