const express = require('express');
const login = require('./controllers/login');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use('/login', login);
app.post('/register', (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(200).send(body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
