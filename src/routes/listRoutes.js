const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');
const { requireOwner, ownerMiddleware } = require('../middlewares/ownerMiddleware');

router.get('/:id', listController.getListById);

router.post('/', ownerMiddleware, listController.createList);
router.get('/', requireOwner, listController.getAllList);
router.get('/search', requireOwner, listController.getListsByName);
router.delete('/:id', requireOwner, listController.deleteList);
router.put('/:id', requireOwner, listController.updateList);

module.exports = router;