import { DbClient } from '../../../db.js';
import { CategoryRepository } from '../../infrastructure/persistence/CategoryRepository.js';
import { GetAllCategoryUseCase } from '../../domain/category/usecases/GetAllCategoryUseCase.js';
import { CategoryController } from '../../interfaces/controllers/CategoryController.js';

export function makeCategoryController() {
  const dbClient = new DbClient();
  const categoryRepository = new CategoryRepository(dbClient);
  const getAllCategoryUseCase = new GetAllCategoryUseCase(categoryRepository);

  return new CategoryController(getAllCategoryUseCase);
}