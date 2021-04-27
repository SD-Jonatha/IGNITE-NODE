import { Router } from "express";
import multer from "multer";

// import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { createCategoryController } from "../modules/cars/UseCases/createCategory";
import { importCategoryController } from "../modules/cars/UseCases/importCategory";
import { listCategoriesController } from "../modules/cars/UseCases/ListCategories";

const categoriesRoutes = Router();
// const categoriesRepository = new CategoriesRepository();
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
