const { validateListName } = require('../utils/validators');
const listModel = require('../models/listModel');

async function createList(req, res) {
  try {
    const { name } = req.body;
    const owner = req.owner;

    if (!validateListName(name)) {
      return res.status(400).json({ error: 'Nome da lista precisa ter pelo menos 3 caracteres.' });
    }

    const newList = await listModel.createList(name, owner);
    res.status(201).json(newList);
  } catch (error) {
    console.error('Erro ao criar lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getLists(req, res) {
  try {
    const owner = req.owner;
    const { name } = req.query;

    if (name) {
      const lists = await listModel.getListsByName(name, owner);
      return res.json(lists);
    }

    const lists = await listModel.getListsByOwner(owner);
    res.json(lists);
  } catch (error) {
    console.error('Erro ao buscar listas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getListById(req, res) {
  try {
    const owner = req.owner;
    const { id } = req.params;

    const list = await listModel.getListById(id, owner);
    if (!list) return res.status(404).json({ error: 'Lista não encontrada.' });

    res.json(list);
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteList(req, res) {
  try {
    const owner = req.owner;
    const { id } = req.params;

    const deleted = await listModel.deleteListById(id, owner);
    if (!deleted) return res.status(404).json({ error: 'Lista não encontrada ou sem permissão.' });

    res.json({ message: 'Lista deletada com sucesso.', id: deleted.id });
  } catch (error) {
    console.error('Erro ao deletar lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createList,
  getLists,
  getListById,
  deleteList,
};
