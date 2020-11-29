require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const Cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');


const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comment');
const postRouter = require('./routes/posts')

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = process.env.DB_URI;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(Cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: false })); //do i need this?
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

//do I need a '/' for this project?????????
app.use('/', authRouter);
//app.use('/blog', postRouter);
app.use('/blog', commentRouter);

app.use('/blog',  postRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
