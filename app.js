var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const menuDataRouter = require('./routes/menuData')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/list',menuDataRouter)

// catch 404 and forward to error handler


app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
})
module.exports = app;
