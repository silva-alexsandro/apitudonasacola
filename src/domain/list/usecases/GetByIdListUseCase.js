import { ListDTO } from '../dto/ListDTO.js';

export class GetByIdListUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(listId, ownerId = undefined) {
  
  const lists = await this.listRepository.findById(listId, ownerId);
  return lists.map((list) => new ListDTO(list));
 }
}
