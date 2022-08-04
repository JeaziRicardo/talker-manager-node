function validateEmail(req, res, next) {
  const { email } = req.body;

  const BAD_REQUEST_STATUS = 400;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  if (!email) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo \'email\' é obrigatório' });
  }
  if (!isEmailValid) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O \'email\' deve ter o formato \'email@email.com\'' });
  }
  next();
}

module.exports = validateEmail;