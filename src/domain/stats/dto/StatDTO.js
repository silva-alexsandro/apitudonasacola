export class StatsDTO {
  constructor(stats) {
    this.owners = stats.owners;
    this.lists = stats.lists;
    this.items = stats.items;
  }
}
