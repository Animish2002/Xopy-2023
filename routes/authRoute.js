// authRoute.js
import express from "express";
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import uploadController from '../controllers/uploadController.js';
import { savePreferences } from '../controllers/preferenceController.js';

const router = express.Router();

// Authentication routes
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/test', requireSignIn, isAdmin, testController);

// File upload and preferences routes
router.post('/upload', uploadController);
router.post('/preferences', savePreferences);

export default router;
