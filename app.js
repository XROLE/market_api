require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./routes/auth_route");
const projectRouter = require("./routes/project_route");
const { catchAsync } = require("./utils/catchAsyncError");
const AppError = require("./utils/appError");
const { stack } = require("sequelize/lib/utils");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

// All routes will be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);


app.use(
  catchAsync(async (req, res, next) => {
    throw new AppError("Route is not found", 404);
  })
);

app.use(globalErrorHandler);
const PORT = process.env.APP_PORT || 4000;

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
