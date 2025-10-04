export class Category {
 constructor({ id, name }) {
  if (!name || name.length < 2) {
   throw new Error('Nome da categoria inválido.');
  }
  this.id = id;
  this.name = name.trim().toLowerCase();
 }
}
