//express app configuration....
const express = require('express');
const dotenv = require('dotenv');
const corsMiddleware = require("./presentation/middlewares/corsMiddleware");
const authRoutes   = require('./presentation/routes/authRoutes');
const healthRoutes = require('./presentation/routes/healthRoutes')
const errorHandler = require("./presentation/middlewares/erroHandler");


//env file configuration...
dotenv.config();

const app = express();

//middlewares...
app.use(corsMiddleware)
app.use(express.json());
//auth routes..
app.use('/api/auth', authRoutes);
//helth checks for dockerise container...
app.use('/api/docker', healthRoutes);
//error handler..
app.use(errorHandler)

//express initiator...




module.exports  = app;
