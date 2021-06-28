import { Router } from "express";
import multer from "multer";

// import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "../modules/cars/UseCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/UseCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/UseCases/ListCategories/ListCategoriesController";

const categoriesRoutes = Router();
// const categoriesRepository = new CategoriesRepository();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
