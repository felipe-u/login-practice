const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(authRoutes);

mongoose
  .connect(
    "mongodb+srv://felipeuv:5di3kG4ZNgdjn6xg@cluster0.wgrnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection error with the database");
    console.log(err);
  });
