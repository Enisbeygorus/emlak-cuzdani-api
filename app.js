require("dotenv").config();
require("express-async-errors");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(bodyParser.json());

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const storesRouter = require("./routes/stores");
const customerPostsRouter = require("./routes/customerPosts");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send('<h1>PetHouse API</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authenticateUser, postsRouter);
app.use("/api/v1/stores", authenticateUser, storesRouter);
app.use("/api/v1/customerPosts", authenticateUser, customerPostsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
