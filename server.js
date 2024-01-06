import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRoute.js';
import { uploadRouter } from './routes/uploadRoutes.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import { getFilesRouter } from './routes/getFilesRoutes.js'

// Config env
dotenv.config();

// Database config
connectDB();

// Create an Express application
const app = express();
// For JSON data
app.use(bodyParser.json({ limit: '50mb' }));

// For Raw data
app.use(bodyParser.raw({ limit: '50mb', type: 'application/octet-stream' }));

// Middlewares
app.use(cors());
app.use(morgan('dev'));

// Use the combined router
app.use(express.json());
app.use('/api/v1/upload', uploadRouter); // Adjust the route path as needed
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/getFiles', getFilesRouter)


// REST API
app.get('/', (req, res) => {
  res.send('Welcome to Xopy');
});

// Define the port to listen on
const PORT = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan);
});
