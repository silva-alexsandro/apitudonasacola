export class IListRepository {
 create(list) {
  throw new Error('Método não implementado');
 }
 updateList(listId, ownerId, updateData) {
  throw new Error('Método não implementado');
 }
 getAllByOwner(ownerId) {
  throw new Error('Método não implementado');
 }
 deleteListById(id, ownerId) {
  throw new Error('Método não implementado');
 }
 deleteLists(ownerId) {
  throw new Error('Método não implementado');
 }
}
