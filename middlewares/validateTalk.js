function validateTalk(req, res, next) {
  const { talk } = req.body;

  const BAD_REQUEST_STATUS = 400;

  if (!talk) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
}

module.exports = validateTalk;
