const Notes = require('../models/notesModel');

/**
 * GET /
 * Dashboard
 */
exports.getDashboard = async (req, res) => {
  try {
    locals = {
      title: 'Dashboard - NodeJs | Notes',
      description: 'NodeJs Notes Project',
    };

    const notes = await Notes.find();
    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: '../views/layouts/dashboard',
    });
  } catch (err) {
    console.log(err);
  }
};
