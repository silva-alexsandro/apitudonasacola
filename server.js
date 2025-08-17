const express = require('express');
const cors = require('cors');

const listRoutes = require('./src/routes/listRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rotas
app.use('/lists', listRoutes);
app.use('/lists/:listId/items', itemRoutes);
app.use('/owners', ownerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor online - só usar! http://localhost:${PORT}`);
});

module.exports = app;
