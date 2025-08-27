import { BaseListUseCase } from '../../common/BaseListUseCase.js';

export class UpdateListsUseCase extends BaseListUseCase {
  constructor(deps) {
    super(deps);
  }

  async execute(listId, ownerId, updateData) {
     await this.ownerController.upLastActive(ownerId);
    return await this.listRepository.updateList(listId, ownerId, updateData);
  }
}
