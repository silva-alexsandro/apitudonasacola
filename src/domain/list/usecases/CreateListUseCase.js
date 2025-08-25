import { List } from '../entities/List.js';

export class CreateListUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }
  async execute({ name, owner }) {
    const list = new List({ name, owner });
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const existingList = await this.listRepository.findByNameAndOwnerAndDateRange(
      name,
      owner.id,
      startOfDay,
      endOfDay
    );
    if (existingList) {
      throw new Error('Já existe uma lista com esse nome criada hoje.');
    }
    return await this.listRepository.create(list);
  }
}
