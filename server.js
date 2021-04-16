const mongoose = require('mongoose');
const express = require('express');
const messageRouter = require('./routes/message');
const Message = require('./models/message');
const userRouter = require('./routes/account');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const NODE_ENV = 'development';
const SESS_NAME = 'user';
const SESS_SECRET = 'verzuscom';
const SESS_LIFETIME = 1000 * 60 * 60; //setting session lifetime for an hour

const sessionMiddleware = (req, res, next) => {
  const user = req.session.user;
  if (!user) res.status(401).send('Please login into your user');
  else next();
};

mongoose
  .connect(
    'mongodb+srv://admin:proj4NSN@cluster0.icovu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('DB Connected');

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        store: MongoStore.create({
          mongoUrl:
            'mongodb+srv://admin:proj4NSN@cluster0.icovu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
          collection: 'sessions',
          ttl: parseInt(SESS_LIFETIME) / 1000,
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
          sameSite: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: parseInt(SESS_LIFETIME),
        },
      })
    );

    app.use('/messages', sessionMiddleware, messageRouter);
    app.use('/account', userRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
