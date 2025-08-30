export class ItemController {
  constructor(createItemUseCase, getAllItemsUseCase, updateItemUseCase, deleteItemsUseCase) {
    this.createItem = createItemUseCase;
    this.getAllItemsUseCase = getAllItemsUseCase;
    this.updateItemUseCase = updateItemUseCase;
    this.deleteItemsUseCase = deleteItemsUseCase;
  }

  create = async (req, res) => {
    try {
      const { listId } = req.params;
      const { name, price, amount, unit, category_id, done } = req.body;
      if (!listId) { throw new Error("listId não foi fornecido na URL."); }
      const result = await this.createItem.execute(listId, { name, price, unit, category_id, amount, done });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  getAllItems = async (req, res, next) => {
    try {
      const { listId, id: itemId } = req.params;
      const owner = req.owner;
      const items = await this.getAllItemsUseCase.execute(listId, owner.id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
  updateItem = async (req, res, next) => {
    try {
      const { listId, id: itemId } = req.params;
      const updateData = req.body;
      const ownerId = req.owner;
      const updatedItem = await this.updateItemUseCase.execute(listId, itemId, updateData, ownerId.id);
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item não encontrado na lista' });
      }
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
  delete = async (req, res, next) => {
    try {
      const { listId, id: itemId } = req.params;
      const ownerId = req.owner;
      const deleted = await this.deleteItemsUseCase.execute(listId, itemId, ownerId.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Item não encontrado na lista' });
      }
      res.json(deleted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
