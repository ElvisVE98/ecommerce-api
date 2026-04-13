import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No autorizado - token requerido',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        message: 'No autorizado - token inválido',
      });
      return;
    }

    req.headers['user-id'] = data.user.id;
    next();

  } catch (error) {
    next(error);
  }
};