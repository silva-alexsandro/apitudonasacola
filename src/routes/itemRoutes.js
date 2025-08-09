const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

// CRUD básico
router.post('/', itemController.createItem);
router.get('/', itemController.getItems);          // /items?name=abc ou /items
router.get('/:id', itemController.getItemById);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

// Associar / desassociar itens a listas
router.post('/:itemId/lists/:listId', itemController.addItemToList);
router.delete('/:itemId/lists/:listId', itemController.removeItemFromList);

// Buscar itens de uma lista
router.get('/list/:listId', itemController.getItemsByListId);

module.exports = router;
