import { isValidListName } from "../../../shared/utils/validators.js";

export class List {
  constructor({ name, owner }) {
    if (!isValidListName(name)) {
      throw new Error('O nome da lista deve ter pelo menos 3 caracteres');
    }
    this.name = name.trim();
    this.owner = owner;
    this.archived = false;
    this.favorite = false;
  }
}