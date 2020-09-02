const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/user');
const authRoutes = require('./routes/auth-routes');
const pageRoutes = require('./routes/page-routes');
const gitHookRoutes = require('./routes/git-hook-routes');
const apiRoutes = require('./routes/api-routes');
const ProjectManager = require('./utils/projectManager');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
app.use(session);

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/project-deploy', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});
mongoose.set('useCreateIndex', true);

app.use(authRoutes);
app.use(pageRoutes);
app.use(gitHookRoutes);
app.use(apiRoutes);

app.listen(port, () => console.log('App listening on port ' + port));
