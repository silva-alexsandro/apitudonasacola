import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CreateListUseCase } from '../../domain/list/usecases/CreateListUseCase.js';
import { GetAllListsUseCase } from '../../domain/list/usecases/GetAllListsUseCase.js';
import { ListController } from '../../interfaces/controllers/ListController.js';
import { UpdateListUseCase } from '../../domain/list/usecases/UpdateListUseCase.js';
import { DeleteListsUseCase } from '../../domain/list/usecases/DeleteListUseCase.js';

export function makeListController() {
  const listRepository = new ListRepository(new DbClient());

  const createListUseCase = new CreateListUseCase(listRepository);
  const getAllListsUseCase = new GetAllListsUseCase(listRepository);
  const updateListsUseCase = new UpdateListUseCase(listRepository);
  const deleteListsUseCase = new DeleteListsUseCase(listRepository);

  return new ListController(createListUseCase, getAllListsUseCase, updateListsUseCase, deleteListsUseCase);
}
