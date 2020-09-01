const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res, next) => {
    res.render('user');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'dark'});
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});