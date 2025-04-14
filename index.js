const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const port=8000;

const matchRoutes=require('./routes/matchRoutes');
const deliveryRoutes=require('./routes/deliveryRoutes');
app.use(express.json());
app.use('/api/matches', matchRoutes);
//app.use('/api/deliveries', deliveryRoutes);

app.listen((port),()=>{
    console.log(`Server is running on port ${port}`);
});