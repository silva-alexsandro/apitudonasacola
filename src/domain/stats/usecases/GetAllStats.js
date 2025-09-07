import { StatsDTO } from "../dto/StatDTO.js";
import { Stats } from "../entities/stat.js";

export class GetStatsAllUseCase {
  constructor(statsRepository,) {
    this.statsRepository = statsRepository;
  }

  async execute() {
    const [owners, lists, items] = await Promise.all([
      this.statsRepository.countAll('owners'),
      this.statsRepository.countAll('lists'),
      this.statsRepository.countAll('items'),
    ]);
    const stats = new Stats({ owners, lists, items });

    return new StatsDTO(stats);
  }
}