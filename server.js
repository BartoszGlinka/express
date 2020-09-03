const express = require('express');
const path = require('path');
const multer  = require('multer')
const upload = multer()

const app = express();
const hbs = require('express-handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');


app.post('/contact/send-message', upload.single('project'), (req, res) => {

    const { author, sender, title, message } = req.body;

    if(author && sender && title && req.file && message ) {
        res.render('contact', { isSent: true, name: req.file.fieldname });
      }
    else {
        res.render('contact', { isError: true });
    }
  });

app.use('/contact', (req, res, next) => {
    res.render('contact');
});

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