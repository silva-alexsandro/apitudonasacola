const categoryModel = require('../models/categoryModel');

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name || name.trim().length < 1) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório.' });
    }
    const category = await categoryModel.createCategory(name);
    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await categoryModel.getCategoryById(id);
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function getCategories(req, res) {
  try {
    const { name } = req.query;
    if (name) {
      const categories = await categoryModel.getCategoriesByName(name);
      return res.json(categories);
    }
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || name.trim().length < 1) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório.' });
    }
    const updated = await categoryModel.updateCategory(id, name);
    if (!updated) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await categoryModel.deleteCategory(id);
    if (!deleted) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.json({ message: 'Categoria deletada com sucesso.', id: deleted.id });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
