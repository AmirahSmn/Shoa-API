const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const propertyRoutes = require("./api/routes/property");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const siteRoutes = require("./api/routes/site");
const blogRoutes = require("./api/routes/blog");
const contactUsRoutes = require("./api/routes/contactUs");

mongoose.connect('mongodb+srv://ShoaHomes:' + process.env.Mongo_PW + '@cluster0.bwbug2p.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/property", propertyRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/site", siteRoutes);
app.use("/blog", blogRoutes);
app.use("/contactUs", contactUsRoutes);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  console.log(error.toString());
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
