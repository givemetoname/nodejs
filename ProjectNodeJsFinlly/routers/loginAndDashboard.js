const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')


// @desc    Login/Landing page
// @route   GET /
router.get('/', loginController.login) 





module.exports = router