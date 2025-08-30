export class CategoryController {
  constructor(getAllCategoryUseCase) {
    this.getAllCategoryUseCase = getAllCategoryUseCase;
  }

  getAllCategories = async (req, res, next) => {
    try {
      const { id: categoryId } = req.params;
      const categories = await this.getAllCategoryUseCase.execute(categoryId);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}