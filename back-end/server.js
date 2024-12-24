import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js"; 
import connectCloudinary from './config/cloudinary.js';
import adminRouter from "./routes/adminRoutes.js"; 
import doctorRouter from "./routes/doctorRoutes.js";
import userRoute from "./routes/userRoute.js";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;


connectDB();
connectCloudinary();

app.use(express.json()); 
app.use(cors()); 

app.use("/api/admin", adminRouter); 
app.use("/api/doctor", doctorRouter); 

app.use('/api/user', userRoute); 


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server Started on port ${port}`));
