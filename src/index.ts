import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./routes/api/api.routes";

dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.use(express.json());

app.use("/api", apiRouter);

//---> connect to DB - first option from mongo db atlas: <--//

const mongoDbUrl = process.env.MONGO_DB_URL || "";
const port = process.env.PORT || 3002;
mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("DB is Connected!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//--> connect to DB - second option- local mongodb: <--//
// const mongoDbUrlLocal = process.env.MONGO_DB_URL_LOCAL || "";
// const port = process.env.PORT || 3002;
// mongoose
//   .connect(mongoDbUrlLocal)
//   .then(() => {
//     console.log("DB is Connected!");
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
