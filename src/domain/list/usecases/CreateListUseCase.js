import { List } from '../entities/List.js';
import { BaseListUseCase } from '../../common/BaseListUseCase.js';

export class CreateListUseCase extends BaseListUseCase {
  constructor(deps) {
    super(deps);
  }

  async validatedListNameExists(name, owner) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const existingList = await this.listRepository.findByNameAndOwnerAndDateRange(
      name,
      owner,
      startOfDay,
      endOfDay
    );
    if (existingList) {
      throw new Error('Já existe uma lista com esse nome criada hoje.');
    }

  }

  async execute({ name, ownerId }) {
    try {
      let finalOwnerId = ownerId;
      if (!ownerId) {
        const newOwner = await this.ownerController.createOwner();
        finalOwnerId = newOwner.id;
      }
      await this.validatedListNameExists(name, finalOwnerId);
      const list = new List({ name, owner: { id: finalOwnerId } });
      const result = await this.listRepository.create(list);
      await this.ownerController.upLastActive(finalOwnerId)
      return result;

    } catch (err) {
      console.error('Erro dentro de execute:', err);
      throw new Error('Falha ao criar a lista.');
    }
  }
}