import { validateItemUpdate } from "../../../shared/utils/validators.js";

export class UpdateItemUseCase {
  constructor(itemRepository, listRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
  }

  async execute(listId, itemId, updateData, ownerId) {
       if (!await this.listRepository.findById(listId, ownerId)) {
      throw new Error('Lista não encontrada ou você não tem permissão para atualizar itens.');
    }
    validateItemUpdate(updateData);
    const updatedItem = await this.itemRepository.update(listId, itemId, updateData);
    if (!updatedItem) { throw new Error('Item não encontrado na lista.'); }
    return updatedItem;
  }
}