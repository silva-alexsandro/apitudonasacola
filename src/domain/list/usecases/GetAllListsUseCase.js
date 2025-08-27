import { BaseListUseCase } from '../../common/BaseListUseCase.js';

export class GetAllListsUseCase extends BaseListUseCase {
  constructor(deps) {
    super(deps);
  }
  async execute(ownerId) {
     await this.ownerController.upLastActive(ownerId);
    return await this.listRepository.getAllByOwner(ownerId);
  }
}
