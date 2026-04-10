import { Router } from "express";
import * as profileController from '../controllers/profile.controller';

const router = Router();

router.get('/:id', profileController.getProfileById);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);

export default router;