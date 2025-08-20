import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js'
import linksRoutes from './routes/links.js'
import redirectRoutes from './routes/redirect.js'
import { dbConnection } from './database/config.js';

const app =  express();
const port = process.env.PORT || 3000;

dbConnection();

//testing routes on public
// app.use(express.static("public"));

//cors
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback){
        if (whiteList.includes(origin)) {
            return callback(null, origin);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    //Activate credentials on cors so we can receive the cookie
    credentials: true,
}))

//Middlewares
app.use(express.json())
app.use(cookieParser())

//Links redirect example
app.use('/', redirectRoutes)

//Endpoints
app.use('/api/auth', authRoutes)
app.use('/api/links', linksRoutes)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
