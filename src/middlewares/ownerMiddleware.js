const { v4: uuidv4 } = require('uuid');
const { checkOwnerExists } = require('../models/ownerModel');

async function requireOwner(req, res, next) {
  try {
    const owner = req.headers['owner-id'] || req.body.owner;
    if (!owner) {
      return res.status(400).json({ error: 'Owner obrigatório no header ou no body.' });
    }
    // Verifica se owner existe no banco
    const exists = await checkOwnerExists(owner);
    if (!exists) {
      return res.status(404).json({ error: 'Owner não encontrado.' });
    }
    req.owner = owner;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Requisição invalida. Necessario um owner id' });
  }
}

function ownerMiddleware(req, res, next) {
  const owner = req.headers['owner-id'] || req.body.owner || uuidv4();
  req.owner = owner;
  next();
}

module.exports = {
  requireOwner,
  ownerMiddleware,
};
