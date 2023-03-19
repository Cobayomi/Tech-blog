const express = require('express')
const { engine } = ('express-handlerbars')
const exphbs = require('express-handlebars')

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlerbars', engine())
app.set('view engine', 'handlers')
app.set('views,', './views')

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/dish-routes'));

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});
