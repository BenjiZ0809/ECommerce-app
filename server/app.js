import express from "express";
import { config } from "dotenv";

config({
  path: "./data/config.env",
});

export const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});

// import routers here
import user from "./routes/user.js";
app.use("/api/v1/user", user);
