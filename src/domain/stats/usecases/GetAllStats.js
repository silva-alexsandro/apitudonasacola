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

    return { owners, lists, items };
  }
}