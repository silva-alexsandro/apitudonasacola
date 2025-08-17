const { v4: uuidv4, validate: isUuid } = require('uuid');

// Middleware para rotas que precisam de owner
async function requireOwner(req, res, next) {
  try {
    const owner = (req.headers['owner-id'] || '').trim();

    if (!owner) {
      return res.status(400).json({ error: 'Owner obrigatório no header.' });
    }

    if (!isUuid(owner)) {
      return res.status(400).json({ error: 'Owner inválido.' });
    }
    req.owner = owner;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

function ownerMiddleware(req, res, next) {
  let owner = req.headers['owner-id'] || req.body.owner;

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
