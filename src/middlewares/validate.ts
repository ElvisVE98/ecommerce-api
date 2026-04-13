import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors: result.error.issues.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

//este codigo es el estandar que se debe seguir para la validacion de los datos de entrada en las rutas, se debe importar el esquema correspondiente y usar el middleware validate con el esquema como argumento, por ejemplo:
