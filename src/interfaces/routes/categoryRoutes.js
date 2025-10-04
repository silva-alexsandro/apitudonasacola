import { Router } from 'express';
import { makeCategoryController } from '../../app/factories/categoryControllerFactory.js';

const router = Router({ mergeParams: true });

const categoryController = makeCategoryController();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getAllCategories);

export default router;
