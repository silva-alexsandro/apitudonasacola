import { CreateItemUseCase } from '../../domain/item/usecases/CreateItemUseCase.js';
import { GetAllItemsUseCase } from '../../domain/item/usecases/GetAllItemsUseCase.js';
import { UpdateItemUseCase } from '../../domain/item/usecases/UpdateItemUseCase.js';
import { DeleteItemsUseCase } from '../../domain/item/usecases/DeleteItemUseCase.js';
import { ItemRepository } from '../../infrastructure/persistence/ItemRepository.js';
import { ItemController } from '../../interfaces/controllers/ItemController.js';
import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';

export function makeItemController() {
  const dbClient = new DbClient();
  const listRepository = new ListRepository(dbClient);
  const itemRepository = new ItemRepository(dbClient);
  const createListUseCase = new CreateItemUseCase(itemRepository);
  const getAllListsUseCase = new GetAllItemsUseCase(itemRepository, listRepository);
  const updateListsUseCase = new UpdateItemUseCase(itemRepository, listRepository);
  const deleteListsUseCase = new DeleteItemsUseCase(itemRepository, listRepository);

  return new ItemController(
    createListUseCase,
    getAllListsUseCase,
    updateListsUseCase,
    deleteListsUseCase
  );
}