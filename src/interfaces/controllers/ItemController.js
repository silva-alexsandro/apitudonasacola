export class ItemController {
 constructor(create, getAll, update, remove) {
  this.createItem = create;
  this.getAllItemsUseCase = getAll;
  this.updateItemUseCase = update;
  this.deleteItemsUseCase = remove;
 }

 create = async (req, res) => {
  try {
   const { listId } = req.params;
   const { name, price, amount, unit, category_id, done } = req.body;
   if (!listId) {
    throw new Error('listId não foi fornecido na URL.');
   }
   const listItemDto = await this.createItem.execute(listId, {
    name,
    price,
    unit,
    category_id,
    amount,
    done,
   });
   res.status(201).json(listItemDto);
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 };

 getAll = async (req, res, next) => {
  try {
   const { listId } = req.params;
   const owner = req.owner;
   const items = await this.getAllItemsUseCase.execute(listId, owner.id);
   res.status(200).json(items);
  } catch (error) {
   res.status(404).json({ message: error.message });
  }
 };

 update = async (req, res, next) => {
  try {
   const { listId, id: itemId } = req.params;
   const updateData = req.body;
   const ownerId = req.owner;

   const updatedItemDTO = await this.updateItemUseCase.execute(
    listId,
    itemId,
    updateData,
    ownerId.id
   );

   if (!updatedItemDTO) {
    return res.status(404).json({ error: 'Item não encontrado na lista' });
   }

   res.json(updatedItemDTO);
  } catch (error) {
   next(error);
  }
 };

 remove = async (req, res, next) => {
  try {
   const { listId, id: itemId } = req.params;
   const ownerId = req.owner;
   const deleted = await this.deleteItemsUseCase.execute(
    listId,
    itemId,
    ownerId.id
   );
   if (!deleted) {
    return res.status(404).json({ error: 'Item não encontrado na lista' });
   }
   res.json(deleted);
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 };

 /* ListShared */
 addItemForListShared = async (req, res) => {
  try {
   const { listId } = req.sharedList;
   const { name, price, amount, unit, category_id, done } = req.body;
   const listItemDto = await this.createItem.execute(listId, {
    name,
    price,
    unit,
    category_id,
    amount,
    done,
   });
   res.status(201).json(listItemDto);
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 };

 updateItemForListShared = async (req, res, next) => {
  try {
   const { id: itemId } = req.params;
   const { listId } = req.sharedList;
   const updateData = req.body;
   const ownerId = req.owner;

   const updatedItemDTO = await this.updateItemUseCase.execute(
    listId,
    itemId,
    updateData
   );

   if (!updatedItemDTO) {
    return res.status(404).json({ error: 'Item não encontrado na lista' });
   }

   res.json(updatedItemDTO);
  } catch (error) {
   next(error);
  }
 };
}
