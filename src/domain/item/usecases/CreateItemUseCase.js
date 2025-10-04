import { ListItemDTO } from '../dto/ListItemDTO.js';
import {
 isValidItemName,
 isValidPrice,
 isValidAmount,
 isValidDone,
 isValidUnit,
} from '../../../shared/utils/validators.js';

export class CreateItemUseCase {
 constructor(itemRepo, listItemRepo, getCategoryById) {
  this.itemRepo = itemRepo;
  this.listItemRepo = listItemRepo;
  this.getCategoryById = getCategoryById;
 }

 _validateInput({ name, price, amount, unit, done }) {
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
   throw new Error(
    'Unidade inválida. Use uma das opções: G, KG, ML, L, UN, DZ, LATA, GARRAFA, CX, PCT'
   );
  }
 }

 async _findOrCreateItem(name) {
  const lowerName = name.toLowerCase();
  let item = await this.itemRepo.findByName(lowerName);
  if (!item) {
   item = await this.itemRepo.create(lowerName);
  }
  return item;
 }

 async execute(listId, { name, price, amount, unit, done, category_id }) {
  this._validateInput({ name, price, amount, unit, done });

  let category = null;
  if (category_id) {
   category = await this.getCategoryById.execute(category_id);
   if (!category) {
    throw new Error('Categoria não encontrada.');
   }
  }

  const item = await this._findOrCreateItem(name);

  const alreadyExists = await this.listItemRepo.findRelation(listId, item.id);
  if (alreadyExists) {
   throw new Error('Item já está na lista.');
  }

  const relation = await this.listItemRepo.createRelation(
   listId,
   item.id,
   price,
   amount,
   unit,
   done,
   category_id
  );

  return new ListItemDTO({
   id: item.id,
   name: item.name,
   price: relation.price,
   amount: relation.amount,
   unit: relation.unit,
   done: relation.done,
   category: category ? { id: category.id, name: category.name } : null,
  });
 }
}
