import { ListDTO } from '../dto/ListDTO.js';

export class GetAllListsUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(ownerId) {
  const lists = await this.listRepository.getAllByOwner(ownerId);
  return lists.map((list) => new ListDTO(list));
 }
}
