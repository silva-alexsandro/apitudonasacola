const express = require('express');
const router = express.Router({ mergeParams: true });

const itemController = require('../controllers/itemController');
const { requireOwner } = require('../middlewares/ownerMiddleware');

router.post('/', requireOwner, itemController.createItem);
router.get('/', requireOwner, itemController.getItemsByListId);
router.put('/:itemId', requireOwner, itemController.updateItemRelation);
router.delete('/:itemId', requireOwner, itemController.deleteItemFromList);

module.exports = router;
