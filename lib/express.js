const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const passport = require('passport');
const TwitterStrategy   = require('passport-twitter').Strategy;
const sess = require('express-session');
const BetterMemoryStore = require('session-memory-store')(sess);
const initRoutes = require('routes');
const UserData = require('controller/user_data');

const secrets = require(process.env.CONFIG_PATH);

const TWITTER_CONSUMER_KEY    = secrets['consumer_key'];
const TWITTER_CONSUMER_SECRET = secrets['consumer_secret'];
const callbackURL = "http://127.0.0.1:3000/twitter/callback";

passport.use(new TwitterStrategy({
  consumerKey:    TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL:    callbackURL
},
  function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
));

// Serialize and deserialize user information
passport.serializeUser(function(user, callback){
  callback(null, user);
});
passport.deserializeUser(function(object, callback){
  callback(null, object);
});

var app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

function initMiddleware() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(sess({
    name: 'newSESSION',
    secret: 'assemblysecret',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Add route '/'

  app.get('/', function(req, res){
    if(req.user)
    {
       console.log(req.user._json.status);
     }
     res.render('');
  });

  app.get('/store', function(req, res){
    if(req.user)
    {
       //console.log(req.user._json.status);
       //console.log(User);
       UserData.UserData.process(req, res);
     }
   // res.render('index');
  });

  /** Add twitter login and return methoods */
  app.get('/twitter/login', passport.authenticate('twitter'));

  app.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect : '/'
  }), 
    function(req, res){
      res.redirect('/store')
    });

    app.set('showStackError', true);
    app.set('view engine', 'ejs');

}

function initErrorRoutes() {
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      console.log(err);
      next();
    }

    // Return error
    return err;
  });
}

function init() {

  initRoutes(app);
  // Initialize Express middleware
  initMiddleware();

  // Initialize modules server routes
  

  // Initialize error routes
  initErrorRoutes();

  return app;
}

module.exports = { init };