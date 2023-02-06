const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.post('/add-cookie', (req, res) => {
    const { key, value } = req.body;
    res.cookie(key, value);
    res.redirect('/');
});

app.get('/', (req, res) => {
    const cookies = req.cookies;
    res.render('addCookie', { cookies });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));