import {
  isValidPrice,
  isValidAmount,
  isValidDone,
  isValidUnit,
  isValidCategoryName,
  validateItemUpdate
} from '../../../shared/utils/validators.js';

export class UpdateItemUseCase {
  constructor(itemRepository, listRepository, categoryRepository) {
    this.itemRepository = itemRepository;
    this.listRepository = listRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(listId, itemId, updateData, ownerId) {
    // Validar se o usuário tem permissão para editar esta lista
    const list = await this.listRepository.findById(listId);
    if (!list || list.owner_id !== ownerId) {
      throw new Error('Lista não encontrada ou sem permissão para editar');
    }

    // Converter tipos antes da validação
    const processedData = { ...updateData };
    
    // Converter price para número se existir
    if (processedData.price !== undefined) {
      processedData.price = Number(processedData.price);
    }
    
    // Converter amount para número se existir
    if (processedData.amount !== undefined) {
      processedData.amount = Number(processedData.amount);
    }
    
    // Converter done para boolean se for string
    if (processedData.done !== undefined && typeof processedData.done === 'string') {
      processedData.done = processedData.done.toLowerCase() === 'true';
    }

    // Validar dados processados
    validateItemUpdate(processedData);

    let category_id = undefined;

    // Processar categoria se for fornecida
    if (processedData.category !== undefined) {
      if (processedData.category === null || processedData.category === '') {
        // Remover categoria
        category_id = null;
      } else {
        if (!isValidCategoryName(processedData.category)) {
          throw new Error('Nome da categoria é inválido (mínimo 2 caracteres, máximo 100).');
        }

        // Buscar categoria existente - NÃO cria se não existir
        const categoryObj = await this.categoryRepository.findByName(
          processedData.category.trim().toLowerCase()
        );
        
        if (!categoryObj) {
          throw new Error('Categoria não encontrada. Use uma categoria existente.');
        }
        
        // Verificar se a categoria pertence ao usuário (opcional)
        if (categoryObj.owner_id !== ownerId) {
          throw new Error('Categoria não pertence ao usuário.');
        }
        
        category_id = categoryObj.id;
      }
      
      // Substituir o campo category por category_id
      processedData.category_id = category_id;
      delete processedData.category;
    }

    // Validar outros campos (já convertidos)
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

    const updatedItem = await this.itemRepository.update(listId, itemId, processedData);
    
    if (!updatedItem) {
      throw new Error('Item não encontrado na lista.');
    }

    return updatedItem;
  }
}