import express, { json } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";
// import { NotFoundError } from "./errors/customErrors.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
import mongoose from "mongoose";
const port = process.env.PORT || 5100;

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

// middleware
app.use(cookieParser())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // prints that is requested
}

app.use(express.json());

app.use("/api/v1/jobs", authenticateUser,jobRouter);
app.use("/api/v1/users", authenticateUser,userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/test",(req,res)=>{
  res.status(200).json({msg:"test route"})
})

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received" });
});

// this gets triggered when the route is invalid
app.use("*", (req, res) => {
  res.status(404).json({ msg: "No route found" }); // 404 not found handler
});
app.use(errorHandlerMiddleware);

// this gets triggered when there is error in processing the request
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something went wrong" }); // 500 server error handler
});

try {
  await mongoose.connect(process.env.MONGO_URL2);
  console.log("DB connected");
} catch (error) {
  console.log(error);
}

app.listen(5100, () => {
  console.log(`Server running on port ${port} `);
});
