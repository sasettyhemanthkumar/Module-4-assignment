const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");
 

const port = process.env.PORT || 7000;
app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(cors())
dotEnv.config();



const corsOptions = {
  origin: "*",
  methods:"*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

 

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB is connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
