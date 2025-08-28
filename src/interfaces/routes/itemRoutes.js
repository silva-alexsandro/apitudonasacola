import { Router } from 'express';
import { ownerMiddleware } from '../middlewares/OwnerMiddleware.js';
import { makeItemController } from '../../app/factories/itemControllerFactory.js';

const router = Router({ mergeParams: true });

const itemController = makeItemController(); // Aqui estamos criando o controlador com os casos de uso

router.post('/', ownerMiddleware, itemController.create);
router.get('/', ownerMiddleware, itemController.getAllItems);
router.put('/item/:id', ownerMiddleware, itemController.updateItem);
router.delete('/item/:id', ownerMiddleware, itemController.delete);

export default router;
