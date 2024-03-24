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
    res.render('dashboard/index', {
      locals,
      layout: '../views/layouts/dashboard',
    });
  } catch (err) {
    console.log(err);
  }
};
