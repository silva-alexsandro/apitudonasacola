import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CreateListUseCase } from '../../domain/list/usecases/CreateListUseCase.js';
import { GetAllListsUseCase } from '../../domain/list/usecases/GetAllListsUseCase.js';
import { ListController } from '../../interfaces/controllers/ListController.js';
import { UpdateListUseCase } from '../../domain/list/usecases/UpdateListUseCase.js';
import { DeleteListsUseCase } from '../../domain/list/usecases/DeleteListUseCase.js';

let controller = null;

export function makeListController() {
  if (controller) {
    return controller;
  }
  const dbClient = new DbClient();
  const listRepository = new ListRepository(dbClient);

  const createListUseCase = new CreateListUseCase(listRepository);
  const getAllListsUseCase = new GetAllListsUseCase(listRepository);
  const updateListsUseCase = new UpdateListUseCase(listRepository);
  const deleteListsUseCase = new DeleteListsUseCase(listRepository);

  controller = new ListController(createListUseCase, getAllListsUseCase,
    updateListsUseCase, deleteListsUseCase);
  return controller;
}
