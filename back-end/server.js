import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
// import connectCloudinary from './config/cloudinary.js';
import adminRouter from "./routes/adminRoutes.js";

//app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
// connectCloudinary()

//middlewares
app.use(express.json());
app.use(cors());

//api end points
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(port, () => console.log("Server Started", port));
