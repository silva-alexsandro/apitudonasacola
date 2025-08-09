const express = require('express');
const cors = require('cors');

const listRoutes = require('./routes/listRoutes');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ownerMiddleware = require('./middlewares/ownerMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(ownerMiddleware.ownerMiddleware);

app.use('/lists', listRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
module.exports = app;
