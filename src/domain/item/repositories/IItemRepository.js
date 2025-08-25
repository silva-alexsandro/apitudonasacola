export class IItemRepository {
  update(listId, updateData) {
    throw new Error('Método não implementado');
  }
  getItemsByListId(listId) {
    throw new Error('Método não implementado');
  }
  deleteItemFromList(id) {
    throw new Error('Método não implementado');
  }
  async create(name) {
    throw new Error('Método não implementado');
  }
  async findByName(name) {
    throw new Error('Método não implementado');
  }
  async findRelation(listId, itemId) {
    throw new Error('Método não implementado');
  }
  async createRelation(listId, itemId, price, amount, done) {
    throw new Error('Método não implementado');
  }
  async update(listId, itemId, fields) {
    throw new Error('Método não implementado');
  }
}
