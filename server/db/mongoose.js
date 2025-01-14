import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const directUrl = process.env.DATABASE_URL;
const dataBaseName = process.env.DATABASE_NAME;

const mongoDbUrl = `${directUrl}/${dataBaseName}`;

mongoose.connect(mongoDbUrl);

mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
})