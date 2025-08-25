import express from 'express';
import cors from 'cors';
import listRoutes from './src/interfaces/routes/listRoutes.js';
import itemRoutes from './src/interfaces/routes/itemRoutes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/list', listRoutes);
app.use('/list/:listId/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor online - só usar! http://localhost:${PORT}`);
});

export default app;