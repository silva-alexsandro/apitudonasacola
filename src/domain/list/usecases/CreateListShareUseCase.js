import { ListShare } from '../entities/ListShare.js';

export class CreateListShareUseCase {
  constructor(listSrareRepository) {
    this.listShareRepo = listSrareRepository;
  }
  async execute(dto) {
    console.log('dto: ', dto)
    const share = ListShare.create(dto);
    console.log('share: ', share)
    const saved = await this.listShareRepo.save(share);
    console.log('saved: ', saved)

    return {
      share_url: `http://localhost:3000/list/share/${saved.token}`,
      expires_at: saved.expires_at,
      permission: saved.permission,
    };
  }
}