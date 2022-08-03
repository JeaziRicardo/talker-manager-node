const express = require('express');
const fs = require('fs').promises;

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;

talkerRoute.get('/', async (_req, res) => {
  const talkersJson = await fs.readFile('./talker.json');
  const talkers = JSON.parse(talkersJson);
  
  res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = talkerRoute;
