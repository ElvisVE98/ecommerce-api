import { Router } from 'express';
import * as orderController from '../controllers/orders.controller';
import {validate} from "../middlewares/validate";
import {authMiddleware} from '../middlewares/auth.middleware';
import { createOrderSchema,updateOrderSchema,createOrderItemSchema } from '../schema/order.schema';


const router = Router();

router.post('/',authMiddleware, validate(createOrderSchema), orderController.createOrder);
router.get('/',authMiddleware, orderController.getAllOrders);
router.get('/:id',authMiddleware, orderController.getOrderById);
router.put('/:id',authMiddleware, validate(updateOrderSchema), orderController.updateOrder);
router.get('/:id/items',authMiddleware, orderController.getOrderItems);
router.post('/:id/items',authMiddleware,validate(createOrderItemSchema), orderController.addOrderItem);
router.delete('/items/:id',authMiddleware, orderController.removeOrderItem);

export default router;