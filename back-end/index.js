const express = require('express');
const bodyParser = require('body-parser');

// https://stackoverflow.com/questions/50968152/cross-origin-request-blocked-with-react-and-express
const cors = require('cors');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const userRegister = require('./controllers/userRegister');
const productList = require('./controllers/productList');

const app = express();
app.use(cors(), bodyParser.json());

app.use(cors());
app.use('/', bodyParser.json());

app.use('/login', login);
app.use('/profile', profile);
app.use('/register', userRegister);
app.use('/productList', productList);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
