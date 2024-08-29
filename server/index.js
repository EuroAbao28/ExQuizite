const express = require("express");
const cors = require("cors");
const connectDB = require("./db/mongoDB");
require("dotenv").config();
require("colors");

const port = process.env.PORT || 5000;
const app = express();

// connect to db
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", require("./routes/userRoute"));

// start server
app.listen(port, () =>
  console.log(`Server running on port: ${port}`.yellow.underline)
);
