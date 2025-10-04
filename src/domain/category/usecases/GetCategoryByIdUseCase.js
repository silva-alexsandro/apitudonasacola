import { CategoryDTO } from '../dto/CategoryDTO.js';

export class GetCategoryByIdUseCase {
 constructor(categoryRepository) {
  this.categoryRepo = categoryRepository;
 }

 async execute(id) {
  if (!id) return null;

  let category = await this.categoryRepo.findById(id);

  if (!category) {
   return null;
  }

  return new CategoryDTO(category);
 }
}
