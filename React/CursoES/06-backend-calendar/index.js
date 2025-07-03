import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import { dbConnection } from './database/config.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

dbConnection();

app.use( express.static('public') );

//body Parse
app.use( express.json() )

//Endpoints
app.use('/api/auth', authRoutes)



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
