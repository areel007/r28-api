import express from "express";
import routes from "./routes/index";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

const location = path.join(__dirname, "uploads");

console.log(location);

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
// Middlewares;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/uploads", express.static(location));

app.use(express.json());

app.use(routes);

export default app;
