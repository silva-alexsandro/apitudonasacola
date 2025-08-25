export class DeleteListsUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }
  async execute(ownerId, listId = null) {
    if (listId) {
      return await this.listRepository.deleteListById(ownerId, listId);
    } else {
      return await this.listRepository.deleteLists(ownerId);
    }
  }
}
