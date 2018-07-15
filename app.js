const express = require('express');
const path =  require('path');
const exphbs   = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride=require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser=require('body-parser');

require('./models/User');
require('./models/Story');

require('./config/passport')(passport);



const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

const keys = require('./config/keys');

const{
    trunc,
    strip,
    formatDate,
    isequal,
    editIcon
}=require('./helpers/hbs');

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI ,{
    useNewUrlParser : true
})
   .then(() => console.log("MongoDB Connected"))
   .catch(err => console.log(err) );

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.engine('handlebars' , exphbs({
    helpers:{
        trunc : trunc,
        strip : strip,
        formatDate:formatDate,
        isequal:isequal,
        editIcon:editIcon
    },
    defaultLayout:'main'
}));

app.set('view engine','handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.use(express.static(path.join(__dirname + '/public')));
app.use('/',index);
app.use('/auth', auth);
app.use('/stories',stories);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server started')
});