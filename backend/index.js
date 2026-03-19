import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./router/userRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

//MongoDB connection
await connectDB();

//Route list
app.get("/", (req, res) => {
  res.send("Welcome to backend api");
});
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
