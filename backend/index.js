const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const bodyParser = require('body-parser');
const port = 8000;

const matchRoutes = require('./routes/matchRoutes');
const deliveryRoutes = require('./routes/DeliveryRoutes');
app.use(express.json());
app.use(cors())
app.use('/api/matches', matchRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'IPL Analytics API' // ✅ Hide the top Swagger header bar
}));

app.listen((port), () => {
  console.log(`Server is running on port ${port}`);
});