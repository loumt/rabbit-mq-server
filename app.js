const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Common = require('./configure/Common')

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a', encoding: 'utf8'})
let options = {}
if (Common.SAVE_MORGAN_IN_FILE) {
  _.assign(options, {stream: accessLogStream})
}
app.use(morgan('tiny', options));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use(require('./routes'));

app.use(function (req, res, next) {
  // next(createError(404));
  // console.log(Object.keys(req))
  Object.keys(req).filter(item => {
    return !['readable', 'socket', 'connection', 'headers'].includes(item) && item.indexOf('_') === -1
  }).map(item => {
    console.log(req[item])
    if (['url', 'method', 'statusCode', 'baseUrl', 'originalUrl'].includes(item)) {
      console.log(`${item} => ${req[item]}`)
    } else {
      console.log(`${item} ????`)
    }
  })
  next(createError(404, `${req['url']} Is Not Found!`))
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
