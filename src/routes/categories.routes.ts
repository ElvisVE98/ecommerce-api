import { Router }  from "express";
import * as categoryController from '../controllers/categories.controller';

const router = Router();

router.get('/',categoryController.getAllCategories);
router.get('/:id',categoryController.getCategoryById);
router.post('/',categoryController.createCategory);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);

export default router; // esto es basicamente para exportar el router para que pueda ser utilizado en otros archivos, como el archivo principal de la aplicación (app.ts o index.ts) donde se configuran las rutas.
