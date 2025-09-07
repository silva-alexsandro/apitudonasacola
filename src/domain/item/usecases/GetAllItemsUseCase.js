import { ListItemDTO } from "../dto/ListItemDTO.js";

export class GetAllItemsUseCase {
  constructor(listRepo, listItemRepo) {
    this.listRepo = listRepo;
    this.listItemRepo = listItemRepo
  }

  async execute(listId, ownerId) {
    const list = await this.listRepo.findById(listId);
    if (!list) {
      throw new Error('Lista não encontrada.');
    }

    if (list.ownerId !== ownerId) {
      throw new Error('Você não tem permissão para acessar esta lista.');
    }
    const items = await this.listItemRepo.getItemsByListId(listId);
    return items.map(item => new ListItemDTO(item));
  }
}
