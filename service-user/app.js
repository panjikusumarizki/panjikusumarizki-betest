require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { DB_CONNECT } = process.env

const mongoose = require('mongoose');
mongoose.connect(`${DB_CONNECT}`);

const usersRouter = require('./routes/users');
const refreshTokenRouter = require('./routes/refreshToken')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/refresh_token', refreshTokenRouter)

module.exports = app;
