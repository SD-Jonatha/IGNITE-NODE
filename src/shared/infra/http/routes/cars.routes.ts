import {Router} from "express";
import multer from "multer";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarsSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listaAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer({ dest: "./tmp/cars" });

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle );
carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle)

export {carsRoutes}