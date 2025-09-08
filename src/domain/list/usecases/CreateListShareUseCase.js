import { ListShareDTO } from '../dto/ListShareDTO.js';
import { ListShare } from '../entities/ListShare.js';

export class CreateListShareUseCase {
  constructor(listSrareRepository) {
    this.listShareRepo = listSrareRepository;
  }
  async start({ list_id, permission }) {

    if (!list_id || !permission) throw new Error('Invalid DTO');
    if (!['read', 'edit'].includes(permission)) {
      throw new Error('Permission must be "read" or "edit"');
    }

    const existingShare = await this.listShareRepo.findByListId(list_id);
    if (existingShare) { return new ListShareDTO(existingShare); }

    const share = ListShare.create({ list_id, permission });
    const saved = await this.listShareRepo.save(share);
    return new ListShareDTO(saved);
  }
}