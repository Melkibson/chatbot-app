import express from "express";
import bodyParser from "body-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import 'dotenv/config';

import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.use(express.json());

app.listen(PORT, () => {
    connectToMongoDB(); 
    console.log(`server is running on port ${PORT}`)
});
