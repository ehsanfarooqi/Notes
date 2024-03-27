const express = require('express');
const dashboardController = require('../controller/dashboardController');
const { isLoggedIn } = require('../middleware/checkAuth');

const router = express.Router();

/**
 * Dashhboard Routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.getDashboard);

module.exports = router;
