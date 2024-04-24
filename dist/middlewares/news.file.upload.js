"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path_1.default.join(__dirname, "uploads/");
        fs_1.default.access(uploadDir, (err) => {
            if (err && err.code === "ENOENT") {
                fs_1.default.mkdir(uploadDir, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr) {
                        console.error("Error creating uploads folder:", mkdirErr);
                        // Provide a default destination if error occurs
                        cb(null, "default_destination/");
                    }
                    else {
                        cb(null, uploadDir);
                    }
                });
            }
            else if (err) {
                console.error("Error accessing uploads folder:", err);
                // Provide a default destination if error occurs
                cb(null, "default_destination/");
            }
            else {
                cb(null, uploadDir);
            }
        });
    },
    filename: function (req, file, cb) {
        let ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext); // Use the original filename
    },
});
