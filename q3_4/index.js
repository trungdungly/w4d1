const express = require('express');
const session = require('express-session');
const products = require('./models/products');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/product/:id', (req, res) => {
    const product = products[req.params.id];
    res.render('index', { product });
});

app.post('/addToCart', (req, res) => {
    const { name, price } = req.body;
    let cart = req.session.cart || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    req.session.cart = cart;
    res.redirect('/cart');
});

app.get('/cart', (req, res) => {
    res.render('shoppingCart', { cart: req.session.cart || [] });
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
