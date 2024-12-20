const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/merntpsolo", {});
console.log("Connected to MongoDB");

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
