const express = require("express");
const userRouter = require("./routers/users");
const authRouter = require("./routers/auths");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const articleRoutes = require("./routers/articles");

// Configure to parse json data

app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" })
})

app.use("/users", userRouter)
app.use("/articles", articleRoutes)
app.use("/", authRouter);

app.listen(8080, () => {
  console.log("http://localhost:8080");
})