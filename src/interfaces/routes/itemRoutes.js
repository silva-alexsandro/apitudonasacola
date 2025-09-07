import { Router } from 'express';
import { ownerMiddleware } from '../middlewares/OwnerMiddleware.js';
import { makeItemController } from '../../app/factories/itemControllerFactory.js';

const router = Router({ mergeParams: true });

const itemController = makeItemController();

router.post('/', ownerMiddleware, itemController.create);
router.get('/', ownerMiddleware, itemController.getAll);
router.put('/item/:id', ownerMiddleware, itemController.update);
router.delete('/item/:id', ownerMiddleware, itemController.remove);

export default router;
