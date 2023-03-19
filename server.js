const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers')


const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers');

const hbs = exphbs.create({helpers});


const Sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')('session.store');

app.use(session({
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new SequelizeStore({
    db: sequelize,
  })
}))



app.engine('handlerbars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/dish-routes'));

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log("Now listening on port 3001"));
});