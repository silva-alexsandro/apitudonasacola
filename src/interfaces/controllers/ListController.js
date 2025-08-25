import { parseBoolean } from "../../shared/utils/parsers.js";
import { isEmptyListUpdate } from "../../shared/utils/validators.js";

export class ListController {
  constructor(createListUseCase, getAllListsUseCase, updateListUseCase, deleteListsUseCase) {
    this.createListUseCase = createListUseCase;
    this.getAllListsUseCase = getAllListsUseCase;
    this.updateListUseCase = updateListUseCase;
    this.deleteListsUseCase = deleteListsUseCase;
  }

  createList = async (req, res) => {
    try {
      const { name } = req.body;
      const owner = req.owner;
      const result = await this.createListUseCase.execute({ name, owner });
      res.setHeader('owner-id', owner);
      res.status(201).json(result);
    } catch (err) {
      if (err.message.includes('Já existe uma lista com esse nome criada hoje.')) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Erro ao criar lista.' });
    }
  };

  getAllLists = async (req, res) => {
    try {
      const { owner } = req;
      const lists = await this.getAllListsUseCase.execute(owner.id);
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar listas' });
    }
  };

  updateList = async (req, res) => {
    try {
      const listId = req.params.id;
      const ownerId = req.owner.id;
      const { name, is_archived, is_favorite } = req.body;

      if (isEmptyListUpdate(name, is_archived, is_favorite)) {
        return res.status(400).json({ error: 'Nenhum campo enviado para atualização.' });
      }

      const updatedList = await this.updateListUseCase.execute(listId, ownerId, {
        name,
        is_archived: parseBoolean(is_archived),
        is_favorite: parseBoolean(is_favorite)
      });

      if (!updatedList) {
        return res.status(404).json({ error: 'Lista não encontrada ou não pertence ao usuário' });
      }

      res.json(updatedList);
    } catch (error) {
      console.error('Erro ao atualizar lista:', error);
      res.status(500).json({ error: 'Erro ao atualizar lista' });
    }
  };

  deleteListById = async (req, res) => {
    try {
      const ownerId = req.owner.id;
      const listId = req.params.id;
      const deleted = await this.deleteListsUseCase.execute(listId, ownerId);

      if (!deleted) {
        return res.status(404).json({ error: 'Lista não encontrada ou não pertence ao usuário.' });
      }

      res.status(200).json({ message: 'Lista deletada com sucesso.', id: deleted.id });
    } catch (err) {
      console.error('Erro ao deletar lista:', err);
      res.status(500).json({ error: 'Erro ao deletar lista.' });
    }
  }

  deleteAllList = async (req, res) => {
    try {
      const ownerId = req.owner.id;

      const deletedLists = await this.deleteListsUseCase.execute(ownerId);

      if (!deletedLists || deletedLists.length === 0) {
        return res.status(200).json({ message: 'Nenhuma lista deletada. Todas estão arquivadas ou favoritas.' });
      }

      res.status(200).json({
        message: `${deletedLists.length} lista(s) deletada(s).`,
        deletedIds: deletedLists.map(l => l.id)
      });
    } catch (err) {
      console.error('Erro ao deletar listas:', err);
      res.status(500).json({ error: 'Erro ao deletar listas.' });
    }
  };
}
