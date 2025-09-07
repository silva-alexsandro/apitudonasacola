import { isValidListName } from '../../../shared/utils/validators.js';
import { ListDTO } from '../dto/ListDTO.js';

export class CreateListUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute({ name, ownerId }) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const existingList = await this.listRepository.findByNameAndOwnerAndDateRange(
      name,
      ownerId,
      startOfDay,
      endOfDay
    );
    if (existingList) {
      throw new Error('Já existe uma lista com esse nome criada hoje.');
    }
    if (!isValidListName(name)) {
      throw new Error('O nome da lista deve ter pelo menos 3 caracteres');
    }

    const list = await this.listRepository.create({ name: name.trim(), ownerId });

    return new ListDTO({
      id: list.id,
      name: list.name,
      archived: list.archived,
      favorite: list.favorite,
      ownerId: list.ownerId,
      createdAt: list.createdAt
    });
  }
}