export class UpdateLastActiveUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async execute(id) {
    return await this.ownerRepository.updateLastActive(id);
  }
}
