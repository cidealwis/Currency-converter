import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import "./db/mongoose.js";

import {CurrencyRouter} from "./routes/currencyRoutes.js"

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api",CurrencyRouter);

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})