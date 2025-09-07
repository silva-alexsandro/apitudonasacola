import { ListDTO } from '../dto/ListDTO.js';

export class UpdateListUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute(listId, ownerId, updateData) {
    const updated = await this.listRepository.updateList(listId, ownerId, updateData);
    return updated ? new ListDTO(updated) : null;
  }
}
