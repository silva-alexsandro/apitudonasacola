export class StatsController {
  constructor(getAllStatsUseCase,) {
    this.getAllStatsUseCase = getAllStatsUseCase;
  }

  getAllStats = async (req, res, next) => {
    try {
      const stats = await this.getAllStatsUseCase.execute();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}