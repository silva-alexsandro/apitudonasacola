import { isValidListName } from "../../../../shared/utils/validators.js";
import { ListDTO } from "../../dto/ListDTO.js";

export class ValidatedListCreator {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async validateName(name) {
    if (!isValidListName(name)) {
      throw new Error('O nome da lista deve ter pelo menos 3 caracteres');
    }
  }

  async ensureNoDuplicateToday(name, ownerId) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const existingList = await this.listRepository.findByNameAndOwnerAndDateRange(
      name.trim(),
      ownerId,
      startOfDay,
      endOfDay
    );

    if (existingList) {
      throw new Error('Já existe uma lista com esse nome criada hoje.');
    }
  }

  async create(name, ownerId) {
    const list = await this.listRepository.create({ name: name.trim(), ownerId });
    return new ListDTO(list);
  }
}