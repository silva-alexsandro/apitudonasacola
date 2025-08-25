export class DeleteItemsUseCase {
  constructor(itemRepository, listRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
  }

  async execute(listId, itemId, ownerId) {
    const list = await this.listRepository.findById(listId, ownerId);
    if (!list) {
      throw new Error('Lista não encontrada ou você não tem permissão para deletar itens.');
    }
    const items = await this.itemRepository.getItemsByListId(listId, list.owner_id, itemId);
    if (!items.length) {
      throw new Error('Item não encontrado nesta lista.');
    }
    const deleted = await this.itemRepository.deleteItemFromList(listId, itemId);
    return deleted;
  }
}