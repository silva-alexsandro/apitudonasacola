export class GetAllListsUseCase {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }
  async execute(ownerId) {
    return await this.listRepository.getAllByOwner(ownerId);
  }
}
