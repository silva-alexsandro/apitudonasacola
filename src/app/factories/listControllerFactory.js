import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CreateListUseCase } from '../../domain/list/usecases/CreateListUseCase.js';
import { GetAllListsUseCase } from '../../domain/list/usecases/GetAllListsUseCase.js';
import { ListController } from '../../interfaces/controllers/ListController.js';
import { UpdateListUseCase } from '../../domain/list/usecases/UpdateListUseCase.js';
import { DeleteListsUseCase } from '../../domain/list/usecases/DeleteListUseCase.js';
import { DuplicateListUseCase } from '../../domain/list/usecases/DuplicateListUseCase.js';
import { ListItemRepository } from '../../infrastructure/persistence/ListItemRepository.js';

let controller = null;

export function makeListController() {
 if (controller) {
  return controller;
 }
 const dbClient = new DbClient();
 const listRepository = new ListRepository(dbClient);
 const listItemRepo = new ListItemRepository(dbClient);

 const createListUseCase = new CreateListUseCase(listRepository);
 const getAllListsUseCase = new GetAllListsUseCase(listRepository);
 const updateListsUseCase = new UpdateListUseCase(listRepository);
 const deleteListsUseCase = new DeleteListsUseCase(listRepository);
 const copyListUseCase = new DuplicateListUseCase(listRepository, listItemRepo);

 controller = new ListController(
  createListUseCase,
  getAllListsUseCase,
  updateListsUseCase,
  deleteListsUseCase,
  copyListUseCase
 );

 return controller;
}
