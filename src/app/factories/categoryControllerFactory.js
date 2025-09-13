import { DbClient } from '../../../db.js';
import { CategoryRepository } from '../../infrastructure/persistence/CategoryRepository.js';
import { GetAllCategoryUseCase } from '../../domain/category/usecases/GetAllCategoryUseCase.js';
import { CategoryController } from '../../interfaces/controllers/CategoryController.js';
let controller = null;

export function makeCategoryController() {
  if (controller) {
    return controller;
  }
  const dbClient = new DbClient();
  const categoryRepository = new CategoryRepository(dbClient);
  const getAllCategoryUseCase = new GetAllCategoryUseCase(categoryRepository);

  controller = new CategoryController(getAllCategoryUseCase);
  return controller;
}