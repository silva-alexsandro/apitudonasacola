import { Router } from 'express';
import { makeListController } from '../../app/factories/listControllerFactory.js';
import { ownerMiddleware } from '../middlewares/OwnerMiddleware.js';

const router = Router();
const listController = makeListController();

router.post('/', ownerMiddleware, listController.createList);
router.get('/', ownerMiddleware, listController.getAllLists);
router.put('/:id', ownerMiddleware, listController.updateList);
router.delete('/:id', ownerMiddleware, listController.deleteList);
router.delete('/', ownerMiddleware, listController.deleteList);

export default router;
