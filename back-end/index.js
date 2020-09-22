const express = require('express');
const login = require('./controllers/login');

const app = express();

app.use('/login', login);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
