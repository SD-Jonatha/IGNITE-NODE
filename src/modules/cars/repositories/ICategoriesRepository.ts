import { Category } from "../entities/Catergory";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
