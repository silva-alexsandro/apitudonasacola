import { ListItemDTO } from "../dto/ListItemDTO.js";

export class DeleteItemsUseCase {
  constructor(listItemRepo, listRepository) {
    this.listItemRepo = listItemRepo;
    this.listRepository = listRepository;
  }

  async execute(listId, itemId, ownerId) {
    const list = await this.listRepository.findById(listId, ownerId);
    if (!list) {
      throw new Error('Lista não encontrada ou você não tem permissão para deletar itens.');
    }

    const items = await this.listItemRepo.getItemsByListId(listId);
    const item = items.find(item => item.itemId === itemId || item.id === itemId);
    
    if (!item) {
      throw new Error('Item não encontrado nesta lista.');
    }

    const deleted = await this.listItemRepo.deleteItemFromList(listId, itemId);
    if (!deleted) {
      throw new Error('Erro ao deletar item.');
    }

    return new ListItemDTO(deleted);
  }
}
