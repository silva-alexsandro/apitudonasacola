export class GetAllItemsUseCase {
  constructor(itemRepository, listRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
  }

  async execute(listId, ownerId, itemId = null) {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new Error('Lista não encontrada.');
    }
    if (list.owner_id !== ownerId) {
      throw new Error('Você não tem permissão para acessar esta lista.');
    }
    const items = await this.itemRepository.getItemsByListId(listId, ownerId, itemId);
    return items;
  }
}
