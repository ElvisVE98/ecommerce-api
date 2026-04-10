import { Router } from 'express';
import * as orderController from '../controllers/orders.controller';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.get('/:id/items', orderController.getOrderItems);
router.post('/:id/items', orderController.addOrderItem);
router.delete('/items/:id', orderController.removeOrderItem);

export default router;