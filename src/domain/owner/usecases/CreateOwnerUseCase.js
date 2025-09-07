import { OwnerDTO } from '../dto/ownerDTO.js';
import { Owner } from '../entities/Owner.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateOwnerUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }
  async execute() {
    const owner = await this.ownerRepository.create(new Owner({ id: uuidv4() }))
    return new OwnerDTO({ id: owner.id, lastActive: owner.lastActive });
  }
}
