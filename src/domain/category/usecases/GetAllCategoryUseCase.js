export class GetAllCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId = null) {
    if (categoryId) {
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new Error('Categoria não encontrada');
      }
      return category;
    }
    
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}