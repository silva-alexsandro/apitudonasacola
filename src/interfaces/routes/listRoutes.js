import { Router } from 'express';
import { makeListController } from '../../app/factories/listControllerFactory.js';
import {
 ownerMiddleware,
 requireOwnerId,
} from '../middlewares/OwnerMiddleware.js';

const router = Router({ mergeParams: true });
const listController = makeListController();

router.post('/', ownerMiddleware, listController.createList);

router.use(requireOwnerId);
router.post('/duplicate', listController.copyList);
router.get('/:id', listController.getByIdList);
router.get('/archived', listController.getAllListsArchived);
router.get('/', listController.getAllLists);
router.put('/:id', listController.updateList);
router.delete('/:id', listController.deleteList);
router.delete('/', listController.deleteList);

export default router;
