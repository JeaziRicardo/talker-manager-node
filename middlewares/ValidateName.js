function validateName(req, res, next) {
  const { name } = req.body;

  const BAD_REQUEST_STATUS = 400;
  const LENGTH_NAME_MIN = 3;

  if (!name) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < LENGTH_NAME_MIN) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

module.exports = validateName;
