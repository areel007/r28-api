import express from "express";
import routes from "./routes/index";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(cors());

dotenv.config({ path: "./config.env" });

// Middlewares;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use(routes);

export default app;
