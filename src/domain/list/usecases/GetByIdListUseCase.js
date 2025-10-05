import { ListDTO } from '../dto/ListDTO.js';

export class GetByIdListUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(listId, ownerId = undefined) {
  const list = await this.listRepository.findById(listId, ownerId);
  return new ListDTO(list);
 }
}
