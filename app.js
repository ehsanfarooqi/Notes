require('dotenv').config();
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const indexRozter = require('./server/routes/indexRouter');
const dashboardRouter = require('./server/routes/dashboardRouter');

const app = express();

// Template Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));

// Body Paeser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', indexRozter);
app.use('/', dashboardRouter);

app.get('*', (req, res) => {
  res.status(404).render('404');
});

// Start Server
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Your app run on port 3000`);
});
