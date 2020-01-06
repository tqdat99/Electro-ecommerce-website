var express = require('express')
var router = express.Router()
router.use(express.static('public'))

var userController = require('../controllers/user')

router.get('/register', userController.checkNotAuthenticated, userController.registerFormGet)
router.post('/register', userController.checkNotAuthenticated, userController.registerFormPost)

router.get('/login', userController.checkNotAuthenticated, userController.logInFormGet)
router.post('/login', userController.checkNotAuthenticated, userController.logInFormPost);

router.get('/profile', userController.checkAuthenticated, userController.profile)
router.post('/profile', userController.checkAuthenticated, userController.profileEdit)

router.post('/logout', userController.logOut)

router.get('/forget-password', userController.checkNotAuthenticated, userController.passwordForgetForm)
router.post('/forget-password', userController.checkNotAuthenticated, userController.passwordForget)
router.get('/forget-password-pending', userController.checkNotAuthenticated, userController.passwordForgetPending)

router.get('/reset-password', userController.passwordResetForm)
router.post('/reset-password', userController.passwordReset);

module.exports = router;