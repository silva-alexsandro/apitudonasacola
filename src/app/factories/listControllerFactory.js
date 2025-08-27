import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CreateListUseCase } from '../../domain/list/usecases/CreateListUseCase.js';
import { GetAllListsUseCase } from '../../domain/list/usecases/GetAllListsUseCase.js';
import { ListController } from '../../interfaces/controllers/ListController.js';
import { UpdateListsUseCase } from '../../domain/list/usecases/UpdateListUseCase.js';
import { DeleteListsUseCase } from '../../domain/list/usecases/DeleteListUseCase.js';
import { makeOwnerController } from './ownerControllerFactory.js';

export function makeListController() {
  const listRepository = new ListRepository(new DbClient());
  const ownerController = makeOwnerController();

  const deps = { listRepository, ownerController };

  const createListUseCase = new CreateListUseCase(deps);
  const getAllListsUseCase = new GetAllListsUseCase(deps);
  const updateListsUseCase = new UpdateListsUseCase(deps);
  const deleteListsUseCase = new DeleteListsUseCase(deps);

  return new ListController(createListUseCase, getAllListsUseCase, updateListsUseCase, deleteListsUseCase);
}
