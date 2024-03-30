const express = require('express');
const dashboardController = require('../controller/dashboardController');
const { isLoggedIn } = require('../middleware/checkAuth');

const router = express.Router();

/**
 * Dashhboard Routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.getDashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.getViewNotes);
router.post(
  '/dashboard/item/:id',
  isLoggedIn,
  dashboardController.getUpdateNotes
);

module.exports = router;
