const express = require('express');
const bodyParser = require('body-parser');

//https://stackoverflow.com/questions/50968152/cross-origin-request-blocked-with-react-and-express
const cors = require('cors');
const login = require('./controllers/login');

const app = express();

app.use(cors());
app.use('/', bodyParser.json());

app.use('/login', login);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
