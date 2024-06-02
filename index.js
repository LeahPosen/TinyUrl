import express from 'express'
import cors from "cors"
import bodyParser from "body-parser";

import LinksRouter from './Routers/LinksRouter.js';
import UsersRouter from './Routers/UsersRouter.js';
import connectDB from './database.js'

connectDB();
const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 3000

app.use('/links', LinksRouter);
app.use('/users', UsersRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
