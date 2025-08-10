const { v4: uuidv4 } = require('uuid');

function requireOwner(req, res, next) {
  try {
    const owner = (req.headers && req.headers['owner-id']) || (req.body && req.body.owner);
    if (!owner) {
      return res.status(400).json({ error: 'Owner obrigatório nesta rota.' });
    }
    req.owner = owner;
    next();
  } catch (error) {
    console.error('Erro no middleware requireOwner:', error);
    return res.status(500).json({ error: 'Erro interno no middleware de autenticação.' });
  }
}

function ownerMiddleware(req, res, next) {
  const headers = req.headers || {};
  const body = req.body || {};

  let owner = headers['owner-id'] || body.owner;

  if (!owner) {
    owner = uuidv4();
  }
  req.owner = owner;
  next();
}

module.exports = {
  requireOwner,
  ownerMiddleware,
};
