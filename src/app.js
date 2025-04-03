import express from 'express';
import Router from './routes/routes.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(Router());

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", +process.env.PORT);
})