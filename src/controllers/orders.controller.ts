import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orders.service';



export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID is required' });
      return;
    }
    const order = await orderService.getOrderById(id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};



export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID is required' });
      return;
    }
    const order = await orderService.updateOrder(id, req.body);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};




export const addOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await orderService.addOrderItem(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};



export const getOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID is required' });
      return;
    }
    const items = await orderService.getOrderItems(id);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};




export const removeOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID is required' });
      return;
    }
    await orderService.removeOrderItem(id);
    res.status(200).json({ success: true, message: 'Item removed successfully' });
  } catch (error) {
    next(error);
  }
};