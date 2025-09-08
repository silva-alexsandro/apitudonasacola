import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { CreateListUseCase } from '../../domain/list/usecases/CreateListUseCase.js';
import { GetAllListsUseCase } from '../../domain/list/usecases/GetAllListsUseCase.js';
import { ListController } from '../../interfaces/controllers/ListController.js';
import { UpdateListUseCase } from '../../domain/list/usecases/UpdateListUseCase.js';
import { DeleteListsUseCase } from '../../domain/list/usecases/DeleteListUseCase.js';
import { ListShareRepository } from '../../infrastructure/persistence/ListShareRepository.js';
import { CreateListShareUseCase } from '../../domain/list/usecases/CreateListShareUseCase.js';

import { ItemRepository } from '../../infrastructure/persistence/ItemRepository.js';
import { GetSharedListUseCase } from '../../domain/list/usecases/GetSharedListUseCase.js';
import { ListItemRepository } from '../../infrastructure/persistence/ListItemRepository.js';


export function makeListController() {
  const dbClient = new DbClient();
  const listRepository = new ListRepository(dbClient);
  const listShareRepository = new ListShareRepository(dbClient);
  const listItemRepo = new ListItemRepository(dbClient);



  /**List Share*/
  const createShare = new CreateListShareUseCase(listShareRepository);
  const getShareList = new GetSharedListUseCase(listShareRepository, listRepository, listItemRepo);

  /**List */
  const createListUseCase = new CreateListUseCase(listRepository);
  const getAllListsUseCase = new GetAllListsUseCase(listRepository);
  const updateListsUseCase = new UpdateListUseCase(listRepository);
  const deleteListsUseCase = new DeleteListsUseCase(listRepository);

  return new ListController(createListUseCase, getAllListsUseCase,
    updateListsUseCase, deleteListsUseCase, createShare, getShareList);
}
