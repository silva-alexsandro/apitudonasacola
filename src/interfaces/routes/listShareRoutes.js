import { Router } from 'express';
import { makeListShareController } from '../../app/factories/listShareControllerFactory.js';
import { editPermissionMiddleware, sharedListMiddleware } from '../middlewares/shareListHandler.js';
import { makeItemController } from '../../app/factories/itemControllerFactory.js';

const router = Router({ mergeParams: true });
const itemController = makeItemController();
const shareController = makeListShareController();

router.post('/', shareController.createShare);

router.get('/:token', sharedListMiddleware, shareController.getSharedList);
router.post('/:token', sharedListMiddleware, editPermissionMiddleware, itemController.addItemForListShared);
router.put('/:token/:id', sharedListMiddleware, editPermissionMiddleware, itemController.updateItemForListShared);

export default router;