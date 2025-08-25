import {
  isValidItemName,
  isValidPrice,
  isValidAmount,
  isValidDone
} from '../../../shared/utils/validators.js';

export class CreateItemUseCase {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async execute(listId, { name, price = 0, amount = 1, done = false }) {
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

    let item = await this.itemRepository.findByName(name);
    if (!item) {
      item = await this.itemRepository.create(name.toLowerCase());
    }

    const relation = await this.itemRepository.findRelation(listId, item.id);
    if (relation) {
      throw new Error('Este item já está associado a esta lista.');
    }

    return await this.itemRepository.createRelation(listId, item.id, price, amount, done);
  }
}
