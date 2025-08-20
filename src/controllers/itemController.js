const itemModel = require('../models/itemModel');

async function createItem(req, res) {
  try {
    const { listId } = req.params;
    const { name, price, amount } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Nome do item é obrigatório.' });
    }
    const item = await itemModel.createItem(listId, { name: name.trim().toLowerCase(), price, amount});
    return res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    return res.status(400).json({ error: error.message });
  }
}

async function getItemsByListId(req, res) {
  try {
    const { listId } = req.params;
    const items = await itemModel.getItemsByListId(listId);
    return res.json(items);
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function updateItemRelation(req, res) {
  try {
    const { listId, itemId } = req.params;
    const { price, amount, done } = req.body;

    const updated = await itemModel.updateItemRelation(listId, itemId, { price, amount, done });

    if (!updated) {
      return res.status(404).json({ error: 'Item não associado a essa lista.' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function deleteItemFromList(req, res) {
  try {
    const { listId, itemId } = req.params;

    const deleted = await itemModel.deleteItemFromList(listId, itemId);

    if (!deleted) {
      return res.status(404).json({ error: 'Associação item-lista não encontrada.' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

module.exports = {
  createItem,
  getItemsByListId,
  updateItemRelation,
  deleteItemFromList,
};
