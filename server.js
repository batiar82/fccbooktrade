const express = require('express');
const app = express();
const routes = require('./app/routes/routes');
const bodyParser = require('body-parser');

require('dotenv').config()

const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api/',routes);
//app.get('/api/hello',(req,res) => res.send({express: 'Hello from express'}));
app.listen(port,()=>console.log(`Listening on ${port}`));


mongoose.connect(process.env.MONGO_FULL_URL);
mongoose.Promise = global.Promise;
