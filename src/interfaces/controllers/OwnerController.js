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
    const ownerDTO = await this.createOwnerUseCase.execute();
    return ownerDTO;
  };
  getOwnerByIdHttp = async (req, res) => {
    try {
      const { id } = req.params;
      const ownerDTO = await this.getOwnerByIdUseCase.execute(id);

      if (!ownerDTO) {
        return res.status(404).json({ error: 'Owner not found' });
      }

      return res.status(200).json(ownerDTO);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  findById = async (ownerId) => {
    const ownerDTO = await this.getOwnerByIdUseCase.execute(ownerId);
    return ownerDTO;
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
