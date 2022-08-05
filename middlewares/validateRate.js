function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  const BAD_REQUEST_STATUS = 400;
  const MIN_RATE = 1;
  const MAX_RATE = 5;

  if (rate === undefined) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (+rate < MIN_RATE || +rate > MAX_RATE) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = validateRate;
