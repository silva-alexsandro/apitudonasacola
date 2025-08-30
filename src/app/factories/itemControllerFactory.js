import { CreateItemUseCase } from '../../domain/item/usecases/CreateItemUseCase.js';
import { GetAllItemsUseCase } from '../../domain/item/usecases/GetAllItemsUseCase.js';
import { UpdateItemUseCase } from '../../domain/item/usecases/UpdateItemUseCase.js';
import { DeleteItemsUseCase } from '../../domain/item/usecases/DeleteItemUseCase.js';
import { ItemRepository } from '../../infrastructure/persistence/ItemRepository.js';
import { ItemController } from '../../interfaces/controllers/ItemController.js';
import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CategoryRepository } from '../../infrastructure/persistence/CategoryRepository.js';

export function makeItemController() {
  const dbClient = new DbClient();
  const listRepository = new ListRepository(dbClient);
  const itemRepository = new ItemRepository(dbClient);
  const categoryRepo = new CategoryRepository(dbClient);
  const createItemUseCase = new CreateItemUseCase(itemRepository, categoryRepo);
  const getAllItemsUseCase = new GetAllItemsUseCase(itemRepository, listRepository);
  const updateItemsUseCase = new UpdateItemUseCase(itemRepository, listRepository);
  const deleteItemsUseCase = new DeleteItemsUseCase(itemRepository, listRepository);

  return new ItemController(
    createItemUseCase,
    getAllItemsUseCase,
    updateItemsUseCase,
    deleteItemsUseCase
  );
}