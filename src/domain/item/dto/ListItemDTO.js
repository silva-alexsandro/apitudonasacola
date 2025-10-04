export class ListItemDTO {
 constructor({ id, name, price, amount, unit, done, category }) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.amount = amount;
  this.unit = unit;
  this.done = done;

  this.category = category
   ? {
      id: category.id,
      name: category.name,
     }
   : null;
 }
}
