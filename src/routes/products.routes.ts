import { Router } from 'express';
import * as productController from '../controllers/products.controller';
import { validate } from '../middlewares/validate';
import {authMiddleware} from '../middlewares/auth.middleware';
import { createProductSchema,updateProductSchema } from '../schema/product.schema';


const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/',authMiddleware, validate(createProductSchema), productController.createProduct);
router.put('/:id',authMiddleware, validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;