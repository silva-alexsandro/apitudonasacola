import { ListDTO } from '../dto/ListDTO.js';

export class GetByIdListUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(listId, ownerId = undefined) {
  console.log('[usecase get by id]');
  console.log('ow - ', ownerId);

  const list = await this.listRepository.findById(listId, ownerId);

  console.log('ow - ', list);

  return new ListDTO(list);
 }
}
