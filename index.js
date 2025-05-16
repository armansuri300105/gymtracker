import express from "express"
import user from "./routes/user.js"
import cors from "cors"
import bodyParser from "body-parser"
import { connect } from "./connection.js";
import data from "./routes/data.js"
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
const URL = process.env.MONGO_URL || "mongodb://localhost:27017/MyGymTracker"

app.use(cors());
app.use(bodyParser.json());
app.use("/api/user", user);
app.use("/api/data",data);

app.listen(PORT, () => {
    connect(URL)
    console.log(`server run on port ${PORT}`);
})