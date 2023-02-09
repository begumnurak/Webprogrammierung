const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { render } = require('ejs');
const path = require("path");

const app = express();
const port = 8080;

//cookie middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if(!req.cookies.user) {
        res.cookie("user", Math.floor(Math.random()*Number.MAX_SAFE_INTEGER));
    }
    console.log(req.cookies);
    next();
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use('/', express.static('public'));

app.get('/test', (req, res) => {
  res.send('aaaa');
});

app.post('/form/', (req, res) => {
  console.log(req.body)
  res.send('Rezept angenommen! ' + req.body.text)
});

app.listen(port, () => {
  console.log(`Our app listening on port ${port}`)
});

