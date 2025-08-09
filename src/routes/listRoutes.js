const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

router.post('/', listController.createList);
router.get('/', listController.getLists);      // /lists?name=abc  ou /lists
router.get('/:id', listController.getListById);
router.delete('/:id', listController.deleteList);

module.exports = router;
