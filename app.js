const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./routes/auth');
require('./config/passport')(passport);
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('It Works!');
});

app.use('/auth', auth);

app.listen(port, () => {
    console.log('Server started on port ${port}')
});