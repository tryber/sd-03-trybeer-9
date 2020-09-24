const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// https://stackoverflow.com/questions/50968152/cross-origin-request-blocked-with-react-and-express
const cors = require('cors');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const userRegister = require('./controllers/userRegister');
const products = require('./controllers/products');

const app = express();
app.use(cors(), bodyParser.json());

app.use('/', bodyParser.json());

app.use('/login', login);
app.use('/profile', profile);
app.use('/register', userRegister);

app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/products', products);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
