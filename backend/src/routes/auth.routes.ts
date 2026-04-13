import { Router } from "express";
import * as authController from '../controllers/auth.controller';
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schema/auth.schema";

const router = Router();

router.post('/register',validate(registerSchema), authController.register);
router.post('/login',validate(loginSchema), authController.login);
router.post('/logout', authController.logout);

export default router; // esto es basicamente para exportar el router para que pueda ser utilizado en otros archivos, como el archivo principal de la aplicación (app.ts o index.ts) donde se configuran las rutas.