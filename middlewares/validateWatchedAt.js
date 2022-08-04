function validateWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  const BAD_REQUEST_STATUS = 400;
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

  next();
}

module.exports = validateWatchedAt;
