import { ValidatedListCreator } from "./helpers/ValidatedListCreator.js";

export class DuplicateListUseCase {
  constructor(listRepo, listItemRepo) {
    this.listRepo = listRepo;
    this.listItemRepo = listItemRepo;
    this.listCreator = new ValidatedListCreator(listRepo);
  }

  async generateUniqueName(baseName, existingNames) {
    let name = baseName + ' Cópia';
    let counter = 1;
    while (existingNames.has(name)) {
      name = `${baseName} Cópia (${counter++})`;
    }
    existingNames.add(name);
    return name;
  }

  async execute({ id, ownerId }) {
    const lists = await this.listRepo.getAllNamesByOwner(ownerId);
    const existingNames = new Set(lists.map(l => l.name));
    const originalList = await this.listRepo.findById(id, ownerId);

    if (!originalList) throw new Error("Lista não encontrada.");

    const newName = await this.generateUniqueName(originalList.name, existingNames);
    const newList = await this.listCreator.create(newName, ownerId);

    const items = await this.listItemRepo.getItemsByListId(originalList.id);
    for (const item of items) {
      let done = false
      const d = await this.listItemRepo.createRelation(
        newList.id,
        item.itemId,
        item.price,
        item.amount,
        item.unit,
        done,
        item.category_id
      );
    }
    return newList;
  }
}