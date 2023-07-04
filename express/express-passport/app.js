require('dotenv').config();
require('./config/connection');
require('./config/authStrategy');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');

const session = require('express-session');

const indexRoutes = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/', adminRoutes);
app.use('/', authRoutes);

app.listen(PORT);
console.log(`The server is listening on port ${PORT}`);