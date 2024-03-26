"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
// import path from "path";
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./config.env" });
app.use((0, cors_1.default)());
// Configure CORS
// const allowedOrigins = [
//   "http://localhost:5174",
//   "https://r28.ng",
//   "http://r28.e37digital.com",
// ];
// const corsOptions: cors.CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));
// Middleware
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Serve static files from the 'uploads' directory
app.use("/uploads", express_1.default.static("uploads"));
app.use(express_1.default.json());
app.use(index_1.default);
// Handle preflight requests
// app.options("*", cors(corsOptions));
exports.default = app;
