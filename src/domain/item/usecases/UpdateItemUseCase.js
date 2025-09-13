import {
  isValidPrice,
  isValidAmount,
  isValidDone,
  isValidUnit,
  validateItemUpdate
} from '../../../shared/utils/validators.js';
import { ListItemDTO } from '../dto/ListItemDTO.js';

export class UpdateItemUseCase {
  constructor(listRepository, listItemRepo, getCategoryById) {
    this.listRepository = listRepository;
    this.listItemRepo = listItemRepo;
    this.getCategoryById = getCategoryById;
  }

  async execute(listId, itemId, updateData, ownerId = null) {
    // 1. Buscar lista
    const list = ownerId
      ? await this.listRepository.findById(listId, ownerId)
      : await this.listRepository.findById(listId);

    if (!list || (ownerId && list.ownerId !== ownerId)) {
      throw new Error('Lista não encontrada ou sem permissão');
    }

    // 2. Processar e validar dados
    const data = { ...updateData };

    if (data.price !== undefined)  data.price  = Number(data.price);
    if (data.amount !== undefined) data.amount = Number(data.amount);
    if (typeof data.done === 'string') data.done = data.done.toLowerCase() === 'true';

    validateItemUpdate(data);

    if ('category_id' in data) {
      if (!data.category_id) {
        data.category_id = null;
      } else {
        const category = await this.getCategoryById.execute(data.category_id);
        if (!category) throw new Error('Categoria não encontrada.');
      }
    }

    if (data.price !== undefined && !isValidPrice(data.price))   throw new Error('Preço inválido');
    if (data.amount !== undefined && !isValidAmount(data.amount)) throw new Error('Quantidade inválida');
    if (data.done !== undefined && !isValidDone(data.done))      throw new Error('Status "done" inválido');
    if (data.unit !== undefined && !isValidUnit(data.unit))      throw new Error('Unidade inválida');

    // 3. Atualizar item
    const updated = await this.listItemRepo.update(listId, itemId, data);
    if (!updated) throw new Error('Item não encontrado');

    // 4. Retornar DTO
    return new ListItemDTO({
      id: updated.itemId,
      name: updated.item_name,
      price: updated.price,
      amount: updated.amount,
      unit: updated.unit,
      done: updated.done,
      category: updated.category_id
        ? { id: updated.category_id, name: updated.category_name }
        : null
    });
  }
}
