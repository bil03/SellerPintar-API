require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/authRoutes');
const merchantRoutes = require('./src/routes/merchantRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/merchants', merchantRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
