"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/news-and-events/");
    },
    filename: function (req, file, cb) {
        let ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext); // Use the original filename
    },
});