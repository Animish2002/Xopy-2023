// routes/uploadRoutes.js
import express from 'express';
import listFilesController from '../controllers/getFileController.js';
// import  uploadController  from '../controllers/uploadController.js';

const getFilesRouter = express.Router();

// Your file upload route
getFilesRouter.get('/', listFilesController);

export { getFilesRouter };
