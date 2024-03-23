const express = require('express');
const mainController = require('../controller/mainController');
const router = express.Router();

/**
 * App Routes
 */
router.get('/', mainController.getHome);
router.get('/about', mainController.getAbout);

module.exports = router;
