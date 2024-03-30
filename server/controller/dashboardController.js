const { default: mongoose } = require('mongoose');
const Notes = require('../models/notesModel');

/**
 * GET /
 * Dashboard
 */
exports.getDashboard = async (req, res, next) => {
  let perPage = 12;
  let page = req.query.page || 1;

  locals = {
    title: 'Dashboard - NodeJs | Notes',
    description: 'NodeJs Notes Project',
  };
  try {
    const notes = await Notes.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      // {
      //   $match: {
      //     user: new mongoose.Types.ObjectId(req.user.id),
      //   },
      // },
      {
        $project: {
          title: { $substr: ['$title', 0, 30] },
          body: { $substr: ['$body', 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Notes.countDocuments();

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: '../views/layouts/dashboard',
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * View Notes
 */
exports.getViewNotes = async (req, res, next) => {
  locals = {
    title: 'Dashboard - NodeJs |View Notes',
    description: 'NodeJs Notes Project',
  };
  try {
    const note = await Notes.findById({ _id: req.params.id })
      .where({ user: req.user.id })
      .lean();

    if (note) {
      res.render('dashboard/notes-view', {
        noteId: req.params.id,
        locals,
        note,
        layout: '../views/layouts/dashboard',
      });
    } else {
      res.send('Somthings went wrong.');
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * Update Notes
 */
exports.getUpdateNotes = async (req, res, next) => {
  locals = {
    title: 'Dashboard - NodeJs | Update Notes',
    description: 'NodeJs Notes Project',
  };
};
