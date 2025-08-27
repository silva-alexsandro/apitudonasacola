export class BaseListUseCase {
  constructor({ listRepository = null, ownerController = null } = {}) {
    this.listRepository = listRepository;
    this.ownerController = ownerController;
  }
}
