import { parseBoolean } from '../../shared/utils/parsers.js';
import { isEmptyListUpdate } from '../../shared/utils/validators.js';

export class ListController {
 constructor(
  createListUseCase,
  getAll,
  updateListUseCase,
  deleteListsUseCase,
  getAllListsArchivedUseCase,
  getByIdList,
  copyListUseCase
 ) {
  this.createListUseCase = createListUseCase;
  this.allList = getAll;
  this.getAllListsArchivedUseCase = getAllListsArchivedUseCase;
  this.getById = getByIdList;
  this.updateListUseCase = updateListUseCase;
  this.deleteListsUseCase = deleteListsUseCase;
  this.copyListUseCase = copyListUseCase;
 }

 createList = async (req, res) => {
  try {
   const { name } = req.body;
   const ownerId = req.owner?.id;
   const listDTO = await this.createListUseCase.execute({ name, ownerId });
   res.setHeader('owner_id', listDTO.ownerId);
   res.status(201).json(listDTO);
  } catch (err) {
   return res.status(400).json({ error: err.message });
  }
 };

 getAllLists = async (req, res) => {
  try {
   const ownerId = req.owner.id;
   const lists = await this.allList.execute(ownerId);
   res.status(200).json(lists);
  } catch (err) {
   res.status(404).json({ error: 'Erro ao buscar listas' });
  }
 };

 getAllListsArchived = async (req, res) => {
  try {
   const ownerId = req.owner.id;
   const lists = await this.getAllListsArchivedUseCase.execute(ownerId);
   res.status(200).json(lists);
  } catch (err) {
   res.status(404).json({ error: 'Erro ao buscar listas' });
  }
 };

 getByIdList = async (req, res) => {
  try {
   const listId = req.params.id;
   const ownerId = req.owner.id;

   const list = await this.getById.execute(listId, ownerId);

   res.status(200).json(list);
  } catch (err) {
   res.status(404).json({ error: 'Erro ao buscar listas' });
  }
 };

 updateList = async (req, res) => {
  try {
   const listId = req.params.id;
   const ownerId = req.owner.id;
   const { name, archived, favorite } = req.body;

   if (isEmptyListUpdate(name, archived, favorite)) {
    return res
     .status(400)
     .json({ error: 'Nenhum campo enviado para atualização.' });
   }

   const updatedList = await this.updateListUseCase.execute(listId, ownerId, {
    name,
    archived: parseBoolean(archived),
    favorite: parseBoolean(favorite),
   });

   if (!updatedList) {
    return res
     .status(404)
     .json({ error: 'Lista não encontrada ou não pertence ao usuário' });
   }
   res.status(200).json(updatedList);
  } catch (error) {
   res.status(500).json({ error: 'Erro ao atualizar lista' });
  }
 };

 deleteList = async (req, res) => {
  try {
   const ownerId = req.owner.id;
   const listId = req.params.id || null;

   const result = await this.deleteListsUseCase.execute(ownerId, listId);

   if (listId) {
    if (!result) {
     return res
      .status(401)
      .json({ error: 'Lista não encontrada ou não pertence ao usuário.' });
    }

    return res
     .status(200)
     .json({ message: 'Lista deletada com sucesso.', id: result.id });
   } else {
    if (!result || result.length === 0) {
     return res.status(200).json({
      message: 'Nenhuma lista deletada. Todas estão arquivadas ou favoritas.',
     });
    }

    return res.status(200).json({
     message: `${result.length} lista(s) deletada(s).`,
     deletedIds: result.map((l) => l.id),
    });
   }
  } catch (err) {
   return res.status(500).json({ error: 'Erro ao deletar lista(s).' });
  }
 };

 copyList = async (req, res) => {
  try {
   const { id } = req.body;
   const ownerId = req.owner.id;
   const listDTO = await this.copyListUseCase.execute({ id, ownerId });
   res.status(201).json(listDTO);
  } catch (err) {
   return res.status(400).json({ error: err.message });
  }
 };
}
