const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { render } = require('ejs');
const path = require("path");
var db = require("./database/database.js");

const app = express();
const port = 3001;
const visits  = {};
//cookie middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use('/', express.static('public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/create_user.routes')(app, db);

app.use((req, res, next) => {
    if(!req.cookies.user) {
      res.render('pages/create_user', {});
    } else {
      next();
    }
})

require('./routes/recipes.routes')(app, db, visits);
require('./routes/landing_page.routes')(app, db);
require('./routes/favorites.routes')(app, db, visits);

app.post('/form/', (req, res) => {
  console.log(req.body)
  res.send('Rezept angenommen! ' + req.body.text)
});

app.listen(port, () => {
  console.log(`Our app listening on port ${port}`)
});

