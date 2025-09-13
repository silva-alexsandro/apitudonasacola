import { DbClient } from '../../../db.js';
import { CreateItemUseCase } from '../../domain/item/usecases/CreateItemUseCase.js';
import { GetAllItemsUseCase } from '../../domain/item/usecases/GetAllItemsUseCase.js';
import { UpdateItemUseCase } from '../../domain/item/usecases/UpdateItemUseCase.js';
import { DeleteItemsUseCase } from '../../domain/item/usecases/DeleteItemUseCase.js';
import { ItemRepository } from '../../infrastructure/persistence/ItemRepository.js';
import { ItemController } from '../../interfaces/controllers/ItemController.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CategoryRepository } from '../../infrastructure/persistence/CategoryRepository.js';
import { ListItemRepository } from '../../infrastructure/persistence/ListItemRepository.js';
import { GetCategoryByIdUseCase } from '../../domain/category/usecases/GetCategoryByIdUseCase.js';

let controller = null;

export function makeItemController() {
  if (controller) {
    return controller;
  }
  const dbClient = new DbClient();

  const listRepo = new ListRepository(dbClient);
  const itemRepo = new ItemRepository(dbClient);
  const listItemRepo = new ListItemRepository(dbClient);
  const categoryRepo = new CategoryRepository(dbClient);

  const getCategoryById = new GetCategoryByIdUseCase(categoryRepo);
  const create = new CreateItemUseCase(itemRepo, listItemRepo, getCategoryById);
  const getAll = new GetAllItemsUseCase(listRepo, listItemRepo);
  const update = new UpdateItemUseCase(listRepo, listItemRepo, getCategoryById);
  const remove = new DeleteItemsUseCase(listItemRepo, listRepo);

  controller = new ItemController(create, getAll, update, remove);
  return controller;
}