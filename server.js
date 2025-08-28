import express from 'express';
import cors from 'cors';
import listRoutes from './src/interfaces/routes/listRoutes.js';
import itemRoutes from './src/interfaces/routes/itemRoutes.js';
import statsRoutes from './src/interfaces/routes/statsRoutes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/list', listRoutes);
app.use('/list/:listId', itemRoutes);
app.use('/stats', statsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor online - tudonassacola-api! http://localhost:${PORT}`);
});

export default app;