import {
  isValidItemName,
  isValidPrice,
  isValidAmount,
  isValidDone,
  isValidUnit,
  isValidCategoryId
} from '../../../shared/utils/validators.js';
import { ListItemDTO } from '../dto/ListItemDTO.js'
export class CreateItemUseCase {
  constructor(itemRepo, listItemRepo, getCategoryById) {
    this.itemRepo = itemRepo;
    this.listItemRepo = listItemRepo;
    this.getCategoryById = getCategoryById;
  }
  async execute(listId, { name, price, amount, unit, done, category_id }) {
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

    const categoryDTO = await this.getCategoryById.execute(category_id);


    let item = await this.itemRepo.findByName(name.toLowerCase());
    if (!item) {
      item = await this.itemRepo.create(name.toLowerCase());
    }

    const exists = await this.listItemRepo.findRelation(listId, item.id);
    if (exists) throw new Error('Item já está na lista.');

    const relation = await this.listItemRepo.createRelation(
      listId, item.id, price, amount, unit, done, category_id
    );
    return new ListItemDTO({
      id: item.id,
      name: item.name,
      price: relation.price,
      amount: relation.amount,
      unit: relation.unit,
      done: relation.done,
      category: relation.category_id ? categoryDTO : null
    });
  }
}