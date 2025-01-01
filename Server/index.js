const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./route/todoRoute");
dotenv.config();
mongoose
  .connect(process.env.MONGO_STR)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(express.json());
app.use("/todo", router);
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running at port  ${port}`);
});
