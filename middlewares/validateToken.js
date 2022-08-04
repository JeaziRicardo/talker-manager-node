function validateToken(req, res, next) {
  const { authorization } = req.headers;

  const UNAUTHORIZED_STATUS = 401;
  const LENGTH_TOKEN = 16;

  if (!authorization) {
    return res.status(UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== LENGTH_TOKEN) {
    return res.status(UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
}

module.exports = validateToken;
