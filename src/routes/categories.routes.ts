import { Router }  from "express";
import * as categoryController from '../controllers/categories.controller';
import { validate } from "../middlewares/validate";
import {authMiddleware} from '../middlewares/auth.middleware';
import { createCategorySchema,updateCategorySchema } from "../schema/category.schema";


const router = Router();

router.get('/',categoryController.getAllCategories);
router.get('/:id',categoryController.getCategoryById);
router.post('/',authMiddleware, validate(createCategorySchema), categoryController.createCategory);
router.put('/:id',authMiddleware, validate(updateCategorySchema),categoryController.updateCategory);
router.delete('/:id',authMiddleware,categoryController.deleteCategory);

export default router; // esto es basicamente para exportar el router para que pueda ser utilizado en otros archivos, como el archivo principal de la aplicación (app.ts o index.ts) donde se configuran las rutas.


