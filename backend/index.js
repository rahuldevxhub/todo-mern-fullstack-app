import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";


dotenv.config();
connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/todo',todoRoute)

const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log(`your app is running in port ${PORT}`);
});
