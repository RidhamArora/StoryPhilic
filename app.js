const express = require('express');
const exphbs   = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const auth = require('./routes/auth');
const index = require('./routes/index');
require('./models/User');
require('./config/passport')(passport);

const app = express();

app.engine('handlebars' , exphbs({
    defaultLayout:'main'
}));

app.set('view engine','handlebars');

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

const keys = require('./config/keys');

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI ,{
    useNewUrlParser : true
})
   .then(() => console.log("MongoDB Connected"))
   .catch(err => console.log(err) );

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.use('/',index);
app.use('/auth', auth);

app.listen(port, () => {
    console.log('Server started')
});