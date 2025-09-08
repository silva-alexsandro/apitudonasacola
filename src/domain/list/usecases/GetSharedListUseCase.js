export class GetSharedListUseCase {
  constructor(listShareRepository, listRepository, listItemRepo) {
    this.listShareRepo = listShareRepository;
    this.listRepo = listRepository;
    this.liRepo = listItemRepo;
  }
  async execute(token) {
    if (!token) throw new Error('Token inválido.');

    const share = await this.listShareRepo.findByToken(token);
    if (!share) throw new Error('Compartilhamento não encontrado.');

    if (share.expiresAt && share.expiresAt < new Date()) {
      throw new Error('Compartilhamento expirado.');
    }

    const list = await this.listRepo.findById(share.list_id);
    if (!list) throw new Error('Lista não encontrada.');

    const items = await this.liRepo.getItemsByListId(share.list_id);
    console.log('',
      list,
      items,
      share.permission,
    )
    return {
      list,
      items,
      permission: share.permission,
    };
  }
}