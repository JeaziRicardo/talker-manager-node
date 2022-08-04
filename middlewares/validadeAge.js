function validateAge(req, res, next) {
  const { age } = req.body;

  const BAD_REQUEST_STATUS = 400;
  const MIN_AGE = 18;

  if (!age) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (+age < MIN_AGE) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

module.exports = validateAge;
