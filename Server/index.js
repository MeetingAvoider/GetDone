const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./route/todoRoute");
const { router: authRoutes } = require("./route/authRoute");
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
app.use("/auth", authRoutes);
app.use("*", function (req, res) {
  res.status(404).json({
    status: "failed",
    message: `There is no URL with this request: ${req.originalUrl} `,
  });
});
``;
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is running at port  ${port}`);
});
