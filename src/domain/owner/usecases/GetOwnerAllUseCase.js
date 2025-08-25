export class GetOwnerAllUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }
  async execute() {
    return await this.ownerRepository.findAll();
  }
}
