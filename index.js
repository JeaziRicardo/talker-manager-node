const express = require('express');
const loginRoute = require('./routes/loginRoute.js');
const talkerRoute = require('./routes/talkerRoute.js');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

app.listen(PORT, () => {
  console.log('Online');
});
