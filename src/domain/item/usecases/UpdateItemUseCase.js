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

  async execute(listId, itemId, updateData, ownerId) {
    // 1. Verifica se a lista existe e pertence ao usuário
    const list = await this.listRepository.findById(listId, ownerId);
    if (!list || list.ownerId !== ownerId) {
      throw new Error('Lista não encontrada ou sem permissão para editar');
    }

    // 2. Processar tipos de dados
    const processedData = { ...updateData };

    if (processedData.price !== undefined) {
      processedData.price = Number(processedData.price);
    }

    if (processedData.amount !== undefined) {
      processedData.amount = Number(processedData.amount);
    }

    if (typeof processedData.done === 'string') {
      processedData.done = processedData.done.toLowerCase() === 'true';
    }

    // 3. Validação geral
    validateItemUpdate(processedData);

    // 4. Processar categoria (com ID)
    if ('category_id' in processedData) {
      if (processedData.category_id === null || processedData.category_id === '') {
        // Remover categoria
        processedData.category_id = null;
      } else {
        const category = await this.getCategoryById(processedData.category_id);

        if (!category) {
          throw new Error('Categoria não encontrada.');
        }

        if (category.owner_id !== ownerId) {
          throw new Error('Categoria não pertence ao usuário.');
        }
      }
    }

    // 5. Validação de campos individuais
    if (processedData.price !== undefined && !isValidPrice(processedData.price)) {
      throw new Error('Preço inválido');
    }

    if (processedData.amount !== undefined && !isValidAmount(processedData.amount)) {
      throw new Error('Quantidade inválida');
    }

    if (processedData.done !== undefined && !isValidDone(processedData.done)) {
      throw new Error('Status "done" inválido');
    }

    if (processedData.unit !== undefined && !isValidUnit(processedData.unit)) {
      throw new Error('Unidade inválida');
    }

    // 6. Atualizar o item
    const updatedItem = await this.listItemRepo.update(listId, itemId, processedData);

    if (!updatedItem) {
      throw new Error('Item não encontrado na lista.');
    }

    // 7. Retornar DTO
    return new ListItemDTO(updatedItem);
  }
}
 