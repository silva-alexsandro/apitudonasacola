import { isValidListName } from "../../../shared/utils/validators.js";

export class Item {
  constructor({ name }) {
    if (!isValidListName(name)) {
      throw new Error('O nome do item deve ter pelo menos 3 caracteres');
    }
    this.name = name;
  }
}