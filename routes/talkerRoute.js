const express = require('express');
const fs = require('fs').promises;
const validateAge = require('../middlewares/validadeAge');
const validateName = require('../middlewares/ValidateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
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

talkerRoute.post('/',
  validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate,
  async (req, res) => {
  const talkersJson = await fs.readFile('./talker.json');
  const talkers = JSON.parse(talkersJson);

  const id = talkers.length + 1;
  const talker = { id, ...req.body };
  talkers.push(talker);
  const talkersString = JSON.stringify(talkers);

  await fs.writeFile('./talker.json', talkersString);

  res.status(CREATED_STATUS).json(talker);
});

module.exports = talkerRoute;
