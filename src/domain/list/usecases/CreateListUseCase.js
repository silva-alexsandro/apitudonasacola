import { ValidatedListCreator } from './helpers/ValidatedListCreator.js';

export class CreateListUseCase {
  constructor(listRepository) {
    this.creatorList = new ValidatedListCreator(listRepository);
  }

  async execute({ name, ownerId }) {
    await this.creatorList.validateName(name);
    await this.creatorList.ensureNoDuplicateToday(name, ownerId);
    return await this.creatorList.create(name, ownerId);
  }
}