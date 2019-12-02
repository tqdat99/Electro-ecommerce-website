var express = require('express')
var router = express.Router()
router.use(express.static('public'))

var userController = require('../controllers/user')

router.get('/register', userController.checkNotAuthenticated, userController.registerFormGet)

router.post('/register', userController.checkNotAuthenticated, userController.registerFormPost)

router.get('/login', userController.checkNotAuthenticated, userController.logInFormGet)

router.post('/login', userController.checkNotAuthenticated, userController.logInFormPost);

router.delete('/logout', userController.logOut)

module.exports = router;