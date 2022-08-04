function validatePassword(req, res, next) {
  const { password } = req.body;

  const BAD_REQUEST_STATUS = 400;
  const LENGTH_PASS_MIN = 6;
  
  if (!password) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo \'password\' é obrigatório' });
  }
  if (password.length < LENGTH_PASS_MIN) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'O \'password\' deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = validatePassword;