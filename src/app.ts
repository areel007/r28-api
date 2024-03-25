import express from "express";
import routes from "./routes/index";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config({ path: "./config.env" });

// Configure CORS
const allowedOrigins = ["http://localhost:5174", "https://r28.ng"];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(routes);

// Handle preflight requests
app.options("*", cors(corsOptions));

export default app;
