import { Router } from 'express';
import { makeListController } from '../../app/factories/listControllerFactory.js';

const router = Router();
const listController = makeListController();

router.get('/:token', listController.getSharedList);
router.post('/', listController.createShare);
export default router;
