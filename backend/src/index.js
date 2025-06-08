import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
    connectDB();
})
