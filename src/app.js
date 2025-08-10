const express = require('express');
const cors = require('cors');

const listRoutes = require('./routes/listRoutes');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/lists', listRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);
app.use('/owners', ownerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor online - só usar! http://localhost:${PORT}`);
});
module.exports = app;
