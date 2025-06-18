require("dotenv").config({path: `${process.cwd()}/.env`})
const express = require("express");
const authRouter = require("./routes/auth_route")

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Wahoo the rest API is working",
    })
});

// All routes will be here
app.use("/api/v1/auth", authRouter);
app.use((req, res, next) => {
    res.status(404).json({
        status: "failed", 
        message: "Route not found"
    });
});
const PORT = process.env.APP_PORT || 4000

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running");
})