export class UpdateLastActiveUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async execute(id) {
    console.log('execute lastactive: ', id)
    return await this.ownerRepository.updateLastActive(id);
  }
}
