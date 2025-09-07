export class ListItemDTO {
  constructor({ listId, itemId, price, amount, unit, done, category_id, category_name }) {
    this.listId = listId;
    this.itemId = itemId;
    this.price = price;
    this.amount = amount;
    this.unit = unit;
    this.done = done;
    this.category = category_id
      ? {
        id: category_id,
        name: category_name
      }
      : null;

  }
}