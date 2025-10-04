import { isExpired } from '../../../shared/utils/handleDate.js';

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

  if (isExpired(share.expiresAt)) {
   throw new Error('Compartilhamento expirado.');
  }

  const list = await this.listRepo.findById(share.list_id);
  if (!list) throw new Error('Lista não encontrada.');

  const items = await this.liRepo.getItemsByListId(share.list_id);
  const listTemp = {
   id: list.id,
   name: list.name,
  };
  return {
   listTemp,
   items,
   permission: share.permission,
  };
 }
}
