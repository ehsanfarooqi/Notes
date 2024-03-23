/**
 * GET /
 * HomePage
 */
exports.getHome = async (req, res) => {
  try {
    locals = {
      title: 'NodeJs | Notes',
      description: 'NodeJs Notes Project',
    };
    res.render('index', locals);
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * AboutPage
 */
exports.getAbout = async (req, res) => {
  try {
    locals = {
      title: 'Abour - NodeJs | Notes',
      description: 'NodeJs Notes Project',
    };
    res.render('about', locals);
  } catch (err) {
    console.log(err);
  }
};
