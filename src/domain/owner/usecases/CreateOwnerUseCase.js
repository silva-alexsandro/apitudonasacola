import { Owner } from '../entities/Owner.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateOwnerUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }
  async execute() {
    const owner = new Owner({ id: uuidv4() });
    return await this.ownerRepository.create(owner);
  }
}
