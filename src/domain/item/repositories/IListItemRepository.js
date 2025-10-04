export class IListItemRepository {
 // Verifica se já existe o item na lista
 async findRelation(listId, itemId) {
  throw new Error('Método não implementado');
 }
 // Cria o item dentro da lista
 async createRelation(listId, itemId, price, amount, unit, done, categoryId) {
  throw new Error('Método não implementado');
 }
 // Atualiza dados do item dentro da lista
 async update(listId, itemId, updateData) {
  throw new Error('Método não implementado');
 }
 // Remove item da lista
 async deleteItemFromList(listId, itemId) {
  throw new Error('Método não implementado');
 }
 // Retorna todos os itens da lista com seus dados
 async getItemsByListId(listId) {
  throw new Error('Método não implementado');
 }
}
