import express from 'express';
import cors from 'cors';
import listRoutes from './src/interfaces/routes/listRoutes.js';
import itemRoutes from './src/interfaces/routes/itemRoutes.js';
import statsRoutes from './src/interfaces/routes/statsRoutes.js';
import categoryRoutes from './src/interfaces/routes/categoryRoutes.js';

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
app.use('/category', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`api tudo na sacola on! http://localhost:${PORT}`);
});

export default app;