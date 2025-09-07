export class IItemRepository {
  async create(name) { throw new Error('Método não implementado'); }
  async findByName(name) { throw new Error('Método não implementado'); }
  async findByNameLike(term) { throw new Error('Método não implementado'); }
}