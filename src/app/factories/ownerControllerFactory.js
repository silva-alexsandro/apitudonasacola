import { DbClient } from '../../../db.js';
import { OwnerRepository } from '../../infrastructure/persistence/OwnerRepository.js';
import { CreateOwnerUseCase } from '../../domain/owner/usecases/CreateOwnerUseCase.js';
import { GetOwnerByIdUseCase } from '../../domain/owner/usecases/GetOwnerByIdUseCase.js';
import { UpdateLastActiveUseCase } from '../../domain/owner/usecases/UpdateLastActiveUseCase.js';
import { GetOwnerAllUseCase } from '../../domain/owner/usecases/GetOwnerAllUseCase.js';
import { OwnerController } from '../../interfaces/controllers/OwnerController.js'
export function makeOwnerController() {
  const ownerRepository = new OwnerRepository(new DbClient());
  const createOwnerUseCase = new CreateOwnerUseCase(ownerRepository);
  const getOwnerByIdUseCase = new GetOwnerByIdUseCase(ownerRepository);
  const getOwnerAllUseCase = new GetOwnerAllUseCase(ownerRepository);
  const updateLastActiveUseCase = new UpdateLastActiveUseCase(ownerRepository);

  return new OwnerController(
    createOwnerUseCase,
    getOwnerByIdUseCase,
    updateLastActiveUseCase,
    getOwnerAllUseCase
  );
}