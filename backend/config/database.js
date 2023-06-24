const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(
      `Successfully connected to database at ${data.connection.host}`
    );
  })
  .catch((error) => {
    throw error;
  });

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB database disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB database Connected!");
});
