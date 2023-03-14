require("dotenv/config");
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const route = require("./routes");
const connectDB = require("./config/db/index");
const ErrorMiddleware = require("./app/middlewares/ErrorMiddleware");

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(ErrorMiddleware);
route(app);

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
