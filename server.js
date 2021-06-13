const path = require('path');
const express = require('express');

// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// variables pointing to folders in the repo
const routes = require('./routes');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3003;
const hour = 300000

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    expires: new Date(Date.now() + hour),
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

const hbs = exphbs.create({helpers});
//templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());

//to collect data that sent from the user
app.use(express.urlencoded({ extended: true }));

//css, imgs, js
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
});

