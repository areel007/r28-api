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
const path_1 = __importDefault(require("path"));
const location = path_1.default.join(__dirname, "uploads");
console.log(location);
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Middlewares;
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use("/uploads", express_1.default.static(location));
app.use(express_1.default.json());
app.use(index_1.default);
exports.default = app;
