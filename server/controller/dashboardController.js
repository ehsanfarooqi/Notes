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
 * PUT /
 * Update Notes
 */
exports.getUpdateNotes = async (req, res, next) => {
  locals = {
    title: 'Dashboard - NodeJs | Update Notes',
    description: 'NodeJs Notes Project',
  };
  try {
    await Notes.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body }
    ).where({ user: req.user.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

/**
 * Delete /
 * Delete Notes
 */
exports.deleteNote = async (req, res, next) => {
  try {
    await Notes.findByIdAndDelete({ _id: req.params.id }).where({
      user: req.user.id,
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get /
 * Get Add Notes
 */
exports.getAddNote = async (req, res, next) => {
  locals = {
    title: 'Dashboard - NodeJs | Update Notes',
    description: 'NodeJs Notes Project',
  };
  try {
    res.render('dashboard/add', {
      locals,
      layout: '../views/layouts/dashboard',
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * POST /
 * Create New Notes
 */
exports.createNote = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    await Notes.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * Get Search Notes
 */
exports.getSearch = async (req, res, next) => {
  try {
    const searchResult = await Notes.find();
    res.render('dashboard/search', {
      searchResult: '',
      layout: '../views/layouts/dashboard',
    });
  } catch {
    console.log(err);
  }
};

/**
 * POST /
 * Search Notes
 */
exports.searchNote = async (req, res, next) => {
  const locals = {
    title: 'Search Note | NodeJs',
    description: 'NodeJs Notes Project',
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

    const notes = await Notes.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    }).where({ user: req.user.id });
    res.render('dashboard/search', {
      notes,
      locals,
      layout: '../views/layouts/dashboard',
    });
  } catch (err) {
    console.log(err);
  }
};
