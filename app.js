import express from "express";
import mongoose from "mongoose";
import { signup, login } from "./controller/auc.js";
const app = express();
app.use(express.json());
const MONGO_URI = "mongodb://127.0.0.1:27017/as";

app.post("/signup", signup);
app.post("/login", login);
app.get('/', (req, res) => res.json({ status: 'auth-service up' }));


async function start(){
try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(3000, console.log("listening on 3000"));
} catch (error) {
    console.error(error);
}
}
start();