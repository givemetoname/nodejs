const express = require('express')
const router = express.Router()
const DashboardController = require('../controller/dashboardController')


// @desc    Login/Landing page
// @route   GET /
router.get('/', DashboardController.dashboard) 





module.exports = router