import { Router } from 'express';
import { ownerMiddleware, requireOwnerId } from '../middlewares/OwnerMiddleware.js';
import { makeItemController } from '../../app/factories/itemControllerFactory.js';

const router = Router({ mergeParams: true });

const itemController = makeItemController();

router.use(requireOwnerId)
router.post('/', itemController.create);
router.get('/', itemController.getAll);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.remove);

export default router;
