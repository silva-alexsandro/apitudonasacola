import { BaseListUseCase } from '../../common/BaseListUseCase.js';

export class DeleteListsUseCase extends BaseListUseCase {
  constructor(deps) {
    super(deps);
  }
  async execute(ownerId, listId = null) {
    await this.ownerController.upLastActive(ownerId);
    if (listId) {
      return await this.listRepository.deleteListById(ownerId, listId);
    } else {
      return await this.listRepository.deleteLists(ownerId);
    }
  }
}
