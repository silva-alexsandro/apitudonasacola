export class UpdateListsUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute(listId, ownerId, updateData) {
    
    return await this.listRepository.updateList(listId, ownerId, updateData);
  }
}
