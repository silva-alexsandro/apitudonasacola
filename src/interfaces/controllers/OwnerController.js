import { parseBoolean } from "../../shared/utils/parsers.js";
import { isEmptyListUpdate } from "../../shared/utils/validators.js";

export class OwnerController {
  constructor(createOwnerUseCase, getOwnerByIdUseCase, getAllOwnersUseCase, updateLastActiveUseCase) {
    this.createOwnerUseCase = createOwnerUseCase;
    this.getOwnerByIdUseCase = getOwnerByIdUseCase;
    this.getAllOwnersUseCase = getAllOwnersUseCase;
    this.updateLastActiveUseCase = updateLastActiveUseCase;
  }

  createOwner = async () => {
    const result = await this.createOwnerUseCase.execute();
    return result
  };
  findById = async (ownerId) => {
    const result = await this.getOwnerByIdUseCase.execute(ownerId);
    return result
  }
  getAll = async (req, res) => {
    try {
      const { owner } = req;
      const lists = await this.getAllListsUseCase.execute(owner.id);
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar listas' });
    }
  };

  upLastActive = async (ownerId) => {
    const result = await this.updateLastActiveUseCase.execute(ownerId);
    return result
  };
}
