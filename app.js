const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

const userinfo = { username: 'justin', password: '123' };

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.redirect('/');
    }
});

app.post('/login', (req, res) => {
    if (userinfo.username === req.body.username && userinfo.password === req.body.password) {
        req.session.user = req.body.username;
        res.redirect('/home');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(4000, () => {
    console.log("server started");
});
