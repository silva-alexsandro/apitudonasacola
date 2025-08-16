
const ownerModel = require('../models/ownerModel.js');

async function getOwners(req, res) {
  try {
    const owners = await ownerModel.getAllOwners();
    res.json({ owners });
  } catch (error) {
    console.log('Erro ao buscar owners:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  getOwners
};
