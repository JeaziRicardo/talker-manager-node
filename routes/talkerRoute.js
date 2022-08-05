const express = require('express');
const fs = require('fs').promises;
const validateAge = require('../middlewares/validadeAge');
const validateName = require('../middlewares/ValidateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');

const talkerRoute = express.Router();
const TALKER_JSON = './talker.json';
const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;
const NOT_FOUND_STATUS = 404;

talkerRoute.get('/', async (_req, res) => {
  const talkersJson = await fs.readFile(TALKER_JSON);
  const talkers = JSON.parse(talkersJson);
  
  res.status(HTTP_OK_STATUS).json(talkers);
});

talkerRoute.post('/',
  validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate,
  async (req, res) => {
  const talkersJson = await fs.readFile(TALKER_JSON);
  const talkers = JSON.parse(talkersJson);

  const id = talkers.length + 1;
  const talker = { id, ...req.body };
  talkers.push(talker);
  const talkersString = JSON.stringify(talkers);

  await fs.writeFile(TALKER_JSON, talkersString);

  res.status(CREATED_STATUS).json(talker);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkersJson = await fs.readFile(TALKER_JSON);
  const talkers = JSON.parse(talkersJson);

  const talker = talkers.find((t) => t.id === +id);

  if (!talker) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

talkerRoute.put('/:id',
  validateToken, validateName, validateAge,
  validateTalk, validateWatchedAt, validateRate,
  async (req, res) => {
  const { id } = req.params;

  const talkersJson = await fs.readFile(TALKER_JSON, 'utf8');
  const talkers = JSON.parse(talkersJson);
  const talker = talkers.map((t) => {
    if (t.id === +id) {
      return { ...t, ...req.body };
    }
    return t;
  });
  
  const talkersString = JSON.stringify(talker);
  await fs.writeFile(TALKER_JSON, talkersString);

  const editTalker = talker.find((t) => t.id === +id);
  
  res.status(HTTP_OK_STATUS).json(editTalker);
});

talkerRoute.delete('/:id',
  validateToken,
  async (req, res) => {
  const { id } = req.params;

  const talkersJson = await fs.readFile(TALKER_JSON, 'utf8');
  const talkers = JSON.parse(talkersJson);

  const removeTalker = talkers.filter((t) => t.id !== +id);

  const talkersString = JSON.stringify(removeTalker);
  await fs.writeFile(TALKER_JSON, talkersString);

  res.status(NO_CONTENT_STATUS).end();
});

module.exports = talkerRoute;
