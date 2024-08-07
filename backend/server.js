const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./db/mongoDb");
const routerPosts = require("./routes/posts.routes");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", routerPosts);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.DATABASE);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
