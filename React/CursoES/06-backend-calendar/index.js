import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js'
import { dbConnection } from './database/config.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

dbConnection();

app.use(cors())

app.use( express.static('public') );

//body Parse
app.use( express.json() )

//Endpoints
app.use('/api/auth', authRoutes)

app.use('/api/events', eventsRoutes)



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
