import { validate as isUuid } from 'uuid';

export class GetToken {
  constructor(shareListRepo) {
    this.shareListRepo = shareListRepo;
  }

  async execute(token) {
    if (!isUuid(token)) throw new Error('Token invalid');
    const result = await this.shareListRepo.findByToken(token);
    if (!result) return null;
    return result;
  }
}
