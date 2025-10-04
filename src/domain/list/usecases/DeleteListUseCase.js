import { ListDTO } from '../dto/ListDTO.js';

export class DeleteListsUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(ownerId, listId = null) {
  if (listId) {
   const deleted = await this.listRepository.deleteListById(listId, ownerId);
   return deleted ? new ListDTO(deleted) : null;
  }

  const deletedLists = await this.listRepository.deleteLists(ownerId);
  return deletedLists.map((list) => new ListDTO(list));
 }
}
