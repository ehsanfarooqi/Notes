const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hallo notes ');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Your app run on port 3000`);
});
