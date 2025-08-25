export class GetOwnerByIdUseCase {
  constructor(ownerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async execute(id) {
    return await this.ownerRepository.findById(id);
  }
}
