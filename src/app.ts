import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import movieRoutes from "./routes/movie.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", movieRoutes);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/movielobby");

export default app;