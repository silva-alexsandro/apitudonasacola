import { Router } from 'express';
import { makeStatsController } from '../../app/factories/statsControllerFactory.js';

const router = Router({ mergeParams: true });

const stats = makeStatsController(); 

router.get('/', stats.getAllStats);

export default router;
