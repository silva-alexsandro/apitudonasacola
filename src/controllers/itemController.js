const itemModel = require('../models/itemModel');

async function createItem(req, res) {
  try {
    const { name, price, amount, category_id } = req.body;
    if (!name || name.trim().length < 1) {
      return res.status(400).json({ error: 'Nome do item é obrigatório.' });
    }
    const item = await itemModel.createItem({ name, price, amount, category_id });
    res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getItemById(req, res) {
  try {
    const { id } = req.params;
    const item = await itemModel.getItemById(id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });
    res.json(item);
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getItems(req, res) {
  try {
    const { name } = req.query;
    if (name) {
      const items = await itemModel.getItemsByName(name);
      return res.json(items);
    }
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar items:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { name, price, amount, category_id } = req.body;

    const updated = await itemModel.updateItem(id, { name, price, amount, category_id });
    if (!updated) return res.status(404).json({ error: 'Item não encontrado.' });
    res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const deleted = await itemModel.deleteItem(id);
    if (!deleted) return res.status(404).json({ error: 'Item não encontrado.' });
    res.json({ message: 'Item deletado com sucesso.', id: deleted.id });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Associar item a lista
async function addItemToList(req, res) {
  try {
    const { listId, itemId } = req.params;
    await itemModel.addItemToList(listId, itemId);
    res.json({ message: 'Item associado à lista com sucesso.' });
  } catch (error) {
    console.error('Erro ao associar item à lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Remover item da lista
async function removeItemFromList(req, res) {
  try {
    const { listId, itemId } = req.params;
    await itemModel.removeItemFromList(listId, itemId);
    res.json({ message: 'Item removido da lista com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover item da lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Buscar itens de uma lista
async function getItemsByListId(req, res) {
  try {
    const { listId } = req.params;
    const items = await itemModel.getItemsByListId(listId);
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar itens da lista:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createItem,
  getItemById,
  getItems,
  updateItem,
  deleteItem,
  addItemToList,
  removeItemFromList,
  getItemsByListId,
};
