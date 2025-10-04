import { DbClient } from '../../../db.js';
import { GetStatsAllUseCase } from '../../domain/stats/usecases/GetAllStats.js';
import { StatsRepository } from '../../infrastructure/persistence/StatsRepository.js';
import { StatsController } from '../../interfaces/controllers/statsController.js';

export function makeStatsController() {
 const statsRepository = new StatsRepository(new DbClient());

 const getStatsAllUseCase = new GetStatsAllUseCase(statsRepository);

 return new StatsController(getStatsAllUseCase);
}
