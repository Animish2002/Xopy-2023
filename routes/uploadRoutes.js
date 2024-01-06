// routes/uploadRoutes.js
import express from 'express';
import  uploadController  from '../controllers/uploadController.js';

const uploadRouter = express.Router();

// Your file upload route
uploadRouter.post('/', uploadController);

export { uploadRouter };
