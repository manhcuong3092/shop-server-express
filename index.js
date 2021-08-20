require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const apiCategoryRoute = require('./api/routes/category.route');
const apiProductRoute = require('./api/routes/product.route');
const apiOrderRoute = require('./api/routes/order.route');
const apiUserRoute = require('./api/routes/user.route');
const apiContactRoute = require('./api/routes/contact.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('Hello World!')
});

app.use('/api/categories', apiCategoryRoute);
app.use('/api/products', apiProductRoute);
app.use('/api/orders', apiOrderRoute);
app.use('/api/users', apiUserRoute);
app.use('/api/contacts', apiContactRoute);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})