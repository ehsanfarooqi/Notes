const express = require('express');
const dashboardController = require('../controller/dashboardController');
const { isLoggedIn } = require('../middleware/checkAuth');

const router = express.Router();

/**
 * Dashhboard Routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.getDashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.getViewNotes);
router.put(
  '/dashboard/item/:id',
  isLoggedIn,
  dashboardController.getUpdateNotes
);
router.delete(
  '/dashboard/item-delete/:id',
  isLoggedIn,
  dashboardController.deleteNote
);
router.get('/dashboard/add', isLoggedIn, dashboardController.getAddNote);
router.post('/dashboard/add', isLoggedIn, dashboardController.createNote);

router.get('/dashboard/search', isLoggedIn, dashboardController.getSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.searchNote);

module.exports = router;
