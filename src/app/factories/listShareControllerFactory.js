import { DbClient } from '../../../db.js';
import { ListRepository } from '../../infrastructure/persistence/ListRepository.js';
import { ListItemRepository } from '../../infrastructure/persistence/ListItemRepository.js';
import { ListShareRepository } from '../../infrastructure/persistence/ListShareRepository.js';

import { CreateListShareUseCase } from '../../domain/list/usecases/CreateListShareUseCase.js';
import { ListShareController } from '../../interfaces/controllers/ListShareController.js';
import { GetSharedListUseCase } from '../../domain/list/usecases/GetSharedListUseCase.js';
import { GetToken } from '../../domain/list/usecases/helpers/GetToken.js';

let controller = null;

export function makeListShareController() {
 if (controller) {
  return controller;
 }

 const dbClient = new DbClient();
 const listRepository = new ListRepository(dbClient);
 const listShareRepository = new ListShareRepository(dbClient);
 const listItemRepo = new ListItemRepository(dbClient);

 const createShare = new CreateListShareUseCase(listShareRepository);
 const getShareList = new GetSharedListUseCase(
  listShareRepository,
  listRepository,
  listItemRepo
 );
 const getToken = new GetToken(listShareRepository);

 controller = new ListShareController(createShare, getShareList, getToken);
 return controller;
}
