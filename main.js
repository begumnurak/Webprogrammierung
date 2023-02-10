const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { render } = require('ejs');
const path = require("path");
var db = require("./database/database.js");

const app = express();
const port = 3000;

//cookie middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if(!req.cookies.user) {
        res.cookie("user", Math.floor(Math.random()*Number.MAX_SAFE_INTEGER));
    }
    //console.log(req.cookies);
    next();
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use('/', express.static('public'));

require('./routes/recipes.routes')(app, db);

app.post('/form/', (req, res) => {
  console.log(req.body)
  res.send('Rezept angenommen! ' + req.body.text)
});

app.listen(port, () => {
  console.log(`Our app listening on port ${port}`)
});

