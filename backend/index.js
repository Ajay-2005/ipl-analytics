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

// custom route required for running on serverless system to serve routes
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

//custom css and custom js required for running on serverless system(vercel)
app.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'IPL Analytics API',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.0/swagger-ui.css',
    swaggerOptions: {
      url: '/swagger.json'// used to fetch routes for rendering on UI
    },
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.0/swagger-ui-standalone-preset.js',
    ],
  })
);

app.listen((port), () => {
  console.log(`Server is running on port ${port}`);

});

