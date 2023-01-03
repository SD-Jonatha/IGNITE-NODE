
import { Category } from "@modules/cars/infra/typeorm/entities/Catergory";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {
 categories: Category[] = [];
 async  findByName(name: string): Promise<Category> {
   const category = this.categories.find((category) => category.name === name);
   return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log(name, description)
    const category = new Category();
    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }
  
}

export {CategoriesRepositoryInMemory}