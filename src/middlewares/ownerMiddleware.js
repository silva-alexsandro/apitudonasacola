const { v4: uuidv4, validate: isUuid } = require('uuid');
const { checkOwnerExists } = require('../models/ownerModel');

function getOwnerFromHeaders(req) {
  const authHeader =
    req.headers['Owner-ID'] || // Seu formato original
    req.headers['owner-id'] || // Versão lowercase
    req.headers['Authorization'] ||
    req.headers['authorization'];

  return authHeader?.replace('Bearer ', '').trim() || '';
}

async function requireOwner(req, res, next) {
  try {
    const owner = getOwnerFromHeaders(req);

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

async function ownerMiddleware(req, res, next) {
  try {
    let owner = getOwnerFromHeaders(req);
    if (owner.startsWith('Bearer ')) {
      owner = owner.slice(7);
    }

    if (owner && !isUuid(owner)) {
      return res.status(400).json({ error: 'Formato de owner inválido' });
    }

    if (!owner) {
      owner = uuidv4();
    }
    else {
      const ownerExists = await checkOwnerExists(owner);
      if (!ownerExists) {
        owner = uuidv4();
      }
    }
    req.owner = owner;
    next();
  } catch (err) {
    console.error('Erro no ownerMiddleware:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = ownerMiddleware;

module.exports = {
  requireOwner,
  ownerMiddleware,
};