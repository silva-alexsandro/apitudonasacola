import { OwnerDTO } from '../dto/ownerDTO.js';
import { validate as isUuid } from 'uuid';

export class GetOwnerByIdUseCase {
 constructor(ownerRepository) {
  this.ownerRepository = ownerRepository;
 }

 async execute(id) {
  if (!isUuid(id)) {
   throw new Error('Invalid Owner ID');
  }

  const result = await this.ownerRepository.findById(id);

  if (!result) {
   return null;
  }

  return new OwnerDTO({
   id: result.id,
   lastActive: result.lastActive,
  });
 }
}
