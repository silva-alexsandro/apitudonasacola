import { Router } from 'express';
import { makeListController } from '../../app/factories/listControllerFactory.js';
import { ownerMiddleware } from '../middlewares/OwnerMiddleware.js';

const router = Router();
const listController = makeListController();

router.post('/', ownerMiddleware, listController.createList);
router.get('/', ownerMiddleware, listController.getAllLists);
router.put('/:id', ownerMiddleware, listController.updateList);
router.delete('/:id', ownerMiddleware, listController.deleteListById);
router.delete('/', ownerMiddleware, listController.deleteAllList);

export default router;
