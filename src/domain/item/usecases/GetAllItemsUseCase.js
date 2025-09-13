import { ListItemDTO } from "../dto/ListItemDTO.js";

export class GetAllItemsUseCase {
  constructor(listRepo, listItemRepo) {
    this.listRepo = listRepo;
    this.listItemRepo = listItemRepo;
  }

  async execute(listId, ownerId) {
    // Busca a lista pelo ID para validar existência e permissão
    const list = await this.listRepo.findById(listId);
    if (!list) {
      throw new Error('Lista não encontrada.');
    }

    if (list.ownerId !== ownerId) {
      throw new Error('Você não tem permissão para acessar esta lista.');
    }

    // Busca os itens relacionados à lista
    const items = await this.listItemRepo.getItemsByListId(listId);

    // Mapeia os itens para o DTO no formato correto
    return items.map(item => {
      // Monta objeto category, caso tenha categoria
      const category = item.category_id
        ? {
          id: item.category_id,
          name: item.category_name
        }
        : null;

      return new ListItemDTO({
        id: item.itemId,
        name: item.item_name,
        price: item.price,
        amount: item.amount,
        unit: item.unit,
        done: item.done,
        category
      });
    });
  }
}
