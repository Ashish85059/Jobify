import express, { json } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5100;


// routers
import jobRouter from "./routes/jobRouter.js";


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // prints that is requested
}

app.use(express.json());

app.use("/api/v1/jobs",jobRouter);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received" });
});

// this gets triggered when the route is invalid
app.use("*",(req,res)=>{
  res.status(404).json({msg: "No route found"})  // 404 not found handler 
})

// this gets triggered when there is error in processing the request
app.use((err,req,res,next)=>{
  console.log(err);
  res.status(500).json({msg: "Something went wrong"})  // 500 server error handler
})
app.listen(5100, () => {
  console.log(`Server running on port ${port} `);
});
