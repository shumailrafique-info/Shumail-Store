const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const { errorMiddleware } = require("./middlewares/erro.js");

//Dotenv Configration
dotenv.config({ path: "./backend/config/config.env" });

//middleWares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Connecting Database
require("./config/database.js");

///Importing Routes an Using Routs
const productRouter = require("./routes/productRoute.js");
const userRouter = require("./routes/userRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");

app.use("/api/v1/product", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);

//Error Handler Middleware
app.use(errorMiddleware);

//Simple Get Request
app.get("/", (req, res) => {
  res.send("Welcome to Shumail Store Server");
});

//Listening App
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port #${process.env.PORT} in ${process.env.NODE_MODE} mode`
  );
});
