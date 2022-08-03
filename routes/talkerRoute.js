const express = require('express');
const fs = require('fs').promises;

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

talkerRoute.get('/', async (_req, res) => {
  const talkersJson = await fs.readFile('./talker.json');
  const talkers = JSON.parse(talkersJson);
  
  res.status(HTTP_OK_STATUS).json(talkers);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkersJson = await fs.readFile('./talker.json');
  const talkers = JSON.parse(talkersJson);

  const talker = talkers.find((t) => t.id === +id);

  if (!talker) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = talkerRoute;
