import {
  isValidItemName,
  isValidPrice,
  isValidAmount,
  isValidDone,
  isValidUnit,
  isValidCategoryId
} from '../../../shared/utils/validators.js';

export class CreateItemUseCase {
  constructor(itemRepository, categoryRepository) {
    this.itemRepository = itemRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(listId, { name, price, unit, category_id, amount, done }) {
    if (!isValidItemName(name)) {
      throw new Error('Nome do item é inválido (mínimo 3 caracteres).');
    }
    if (!isValidPrice(price)) {
      throw new Error('Preço deve ser um número positivo.');
    }
    if (!isValidAmount(amount)) {
      throw new Error('Quantidade deve ser um número inteiro maior ou igual a 1.');
    }
    if (!isValidDone(done)) {
      throw new Error('O campo "done" deve ser verdadeiro ou falso.');
    }
    if (!isValidUnit(unit)) {
      throw new Error('Unidade inválida. Use uma das opções: G KG ML L UN DZ LATA GARRAFA CX PCT');
    }

    if (!isValidCategoryId(category_id)) {
      throw new Error('id da categoria é inválida.');
    }
    const categoryObj = await this.categoryRepository.findById(category_id);

    if (!categoryObj) {
      throw new Error('Categoria não encontrada. Use uma categoria existente.');
    }


    let item = await this.itemRepository.findByName(name);
    if (!item) {
      item = await this.itemRepository.create(name.toLowerCase());
    }

    const relation = await this.itemRepository.findRelation(listId, item.id);
    if (relation) {
      throw new Error('Este item já está associado a esta lista.');
    }
    return await this.itemRepository.createRelation(
      listId,
      item.id,
      price,
      amount,
      unit,
      done,
      category_id
    );
  }
}