export class ListItem {
  constructor({
    listId,
    itemId,
    price,
    amount,
    unit,
    done,
    category_id,
    category_name,
    item_name
  }) {
    this.listId = listId;
    this.itemId = itemId;
    this.price = price;
    this.amount = amount;
    this.unit = unit;
    this.done = done;
    this.category_id = category_id;
    this.category_name = category_name;
    this.item_name = item_name;
  }
}
