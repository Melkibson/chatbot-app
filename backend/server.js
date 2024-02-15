import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import 'dotenv/config';

import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Server is ready");
});
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)
});
