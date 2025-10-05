import { ListDTO } from '../dto/ListDTO.js';

export class GetAllListsArchivedUseCase {
 constructor(listRepository) {
  this.listRepository = listRepository;
 }
 async execute(ownerId) {
  const lists = await this.listRepository.getAllArchivedByOwner(ownerId);
  return lists.map((list) => new ListDTO(list));
 }
}
