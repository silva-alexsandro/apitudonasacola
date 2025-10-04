import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import listRoutes from './src/interfaces/routes/listRoutes.js';
import itemRoutes from './src/interfaces/routes/itemRoutes.js';
import statsRoutes from './src/interfaces/routes/statsRoutes.js';
import listShareRoutes from './src/interfaces/routes/listShareRoutes.js';
import { errorHandler } from './src/interfaces/middlewares/errorHandler.js';

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
 ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
 : ['*'];

app.use(
 cors({
  origin: (origin, callback) => {
   if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true);
   }
   callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
 })
);

app.use(express.json());

app.use('/list/share', listShareRoutes);
app.use('/list/:listId/item', itemRoutes);
app.use('/list', listRoutes);
app.use('/stats', statsRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`api on! http://localhost:${PORT}`);
});

export default app;
