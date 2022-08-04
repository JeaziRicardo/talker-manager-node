const express = require('express');
const crypto = require('crypto');

const loginRoute = express.Router();
const HTTP_OK_STATUS = 200;

loginRoute.post('/', (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRoute;