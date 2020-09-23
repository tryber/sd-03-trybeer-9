const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./controllers/login');
const userRegister = require('./controllers/userRegister');

const app = express();
app.use(cors(), bodyParser.json());

app.use('/login', login);
app.use('/register', userRegister);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
