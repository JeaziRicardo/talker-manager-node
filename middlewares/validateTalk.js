const BAD_REQUEST_STATUS = 400;

function validateWatchedAt(req, res) {
  const { talk: { watchedAt } } = req.body;

  const DATE_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isValidDate = DATE_REGEX.test(watchedAt);

  if (!watchedAt) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!isValidDate) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateRate(req, res) {
  const { talk: { rate } } = req.body;

  const MIN_RATE = 1;
  const MAX_RATE = 5;

  if (!rate) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (+rate < MIN_RATE || +rate > MAX_RATE) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5"' });
  }
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  validateWatchedAt();
  validateRate();
  next();
}

module.exports = validateTalk;
