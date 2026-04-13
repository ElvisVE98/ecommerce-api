import { Router } from "express";
import * as profileController from '../controllers/profile.controller';
import {validate} from "../middlewares/validate";
import {authMiddleware} from '../middlewares/auth.middleware';
import { updateProfileSchema } from "../schema/profile.schema";

const router = Router();

router.get('/:id', authMiddleware, profileController.getProfileById);
router.post('/',authMiddleware,  profileController.createProfile);
router.put('/:id',authMiddleware, validate(updateProfileSchema), profileController.updateProfile);

export default router;