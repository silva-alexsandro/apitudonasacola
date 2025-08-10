const { isValidListName } = require('../utils/validators.js');
const listModel = require('../models/listModel.js');

async function createList(req, res) {
  try {
    const { name } = req.body;
    const owner = req.owner;

    if (!isValidListName(name)) {
      return res.status(400).json({ error: 'Nome da lista precisa ter pelo menos 3 caracteres.' });
    }

    const newList = await listModel.createList(name, owner);

    res.setHeader('owner-id', owner);

    res.status(201).json(newList);
  } catch (error) {
    console.error('Erro ao criar lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
async function getOwners(req, res) {
  try {
    const owners = await listModel.getAllOwners();
    res.json({ owners });
  } catch (error) {
    console.error('Erro ao buscar owners:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
async function getAllList(req, res) {
  try {
    const owner = req.owner;
    const lists = await listModel.getListsByOwner(owner);
    res.json(lists);
  } catch (error) {
    console.error('Erro ao buscar listas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
async function getListsByName(req, res) {
  try {
    const owner = req.owner;
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Parâmetro "name" é obrigatório para esta rota.' });
    }

    const lists = await listModel.getListsByName(name, owner);
    res.json(lists);
  } catch (error) {
    console.error('Erro ao buscar listas por nome:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getListById(req, res) {
  try {
    const { id } = req.params;

    const list = await listModel.getListById(id);
    if (!list) return res.status(404).json({ error: 'Lista não encontrada.' });

    res.json(list);
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function updateList(req, res) {
  try {
    const { id } = req.params;
    const owner = req.owner;
    const { name } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({ error: 'Nome da lista precisa ter pelo menos 3 caracteres.' });
    }

    const updatedList = await listModel.updateList(id, owner, name);

    if (!updatedList) {
      return res.status(404).json({ error: 'Lista não encontrada ou sem permissão para atualizar.' });
    }

    res.json(updatedList);
  } catch (error) {
    console.error('Erro ao atualizar lista:', error);
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
  getAllList,
  getListsByName,
  getListById,
  updateList,
  deleteList,
  getOwners
};
