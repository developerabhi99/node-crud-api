const express = require("express");
const path = require("path");
const PORT = 8001;
const app = express();
const { connectMongo } = require("./model/connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUser, restrictToRole } = require("./middlewares/auth");

//connection
const mongoUrl = "mongodb://127.0.0.1:27017/short-url";
connectMongo(mongoUrl)
  .then(() => console.log("Mongo DB connected !"))
  .catch((err) => console.log(`Error while connecting ${err}`));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
//app.use(restrictToLoggedInUser);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Public routes (no login required)
app.use("/", staticRoute); // e.g. login, signup, homepage

// Protected routes (login required)
app.use(restrictToLoggedInUser);
app.use("/url",restrictToRole(['NORMAL']), urlRoute);

app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
