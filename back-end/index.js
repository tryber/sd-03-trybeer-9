const express = require('express');
const cors = require('cors');
const login = require('./controllers/login');
const products = require('./controllers/products');

const app = express();

app.use(cors());
app.use('/login', login);

app.use('/images', express.static(__dirname + '/images'));

app.get('/products', products);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
