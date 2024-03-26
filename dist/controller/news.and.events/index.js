"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsAndEvents = exports.getNewsAndEvents = exports.getAllNewsAndEvents = exports.addNewsAndEvents = void 0;
const news_and_events_1 = __importDefault(require("../../models/news.and.events"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Add news and events
const addNewsAndEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let path = "";
    try {
        if (req.files) {
            const files = Array.isArray(req.files) ? req.files : [req.files];
            files.forEach((file) => {
                if (Array.isArray(file)) {
                    file.forEach((singleFile) => {
                        path = path + singleFile.path + ",";
                    });
                }
                else {
                    path = path + file.path + ",";
                }
            });
            path = path.substring(0, path.lastIndexOf(","));
        }
        const { title, subtitle, content } = req.body;
        const newsImgUrl = path;
        const news = new news_and_events_1.default({
            title,
            subtitle,
            content,
            newsImgUrl,
        });
        yield news.save();
        res.status(201).json({ message: "News and events successfully added" });
    }
    catch (error) {
        console.error("Error adding news and events:", error);
        res.status(500).json({ message: "Error adding news and events" });
    }
});
exports.addNewsAndEvents = addNewsAndEvents;
const getAllNewsAndEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsAndEvents = yield news_and_events_1.default.find();
        res.status(200).json({ newsAndEvents });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllNewsAndEvents = getAllNewsAndEvents;
const getNewsAndEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newsAndEvents = yield news_and_events_1.default.findById(id);
        if (!newsAndEvents) {
            return res.status(404).json({ message: "resource not found" });
        }
        res.status(200).json({ newsAndEvents });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getNewsAndEvents = getNewsAndEvents;
const deleteNewsAndEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newsAndEvents = yield news_and_events_1.default.findById(id);
        if (!newsAndEvents) {
            return res.status(404).json({ message: "Resource not found" });
        }
        if (!newsAndEvents.newsImgUrl) {
            return res
                .status(400)
                .json({ message: "No images associated with this entry" });
        }
        // Extract image URLs
        const imageUrls = newsAndEvents.newsImgUrl.split(",");
        // Delete each image associated with the post
        imageUrls.forEach((imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const imagePath = path_1.default.join(__dirname, "..", "uploads", imageUrl.trim());
                if (fs_1.default.existsSync(imagePath)) {
                    yield fs_1.default.promises.unlink(imagePath);
                }
            }
            catch (err) {
                console.error("Error deleting file:", err);
            }
        }));
        // Delete the news and events entry
        yield news_and_events_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "News and events successfully deleted along with associated images",
        });
    }
    catch (error) {
        console.error("Error deleting news and events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteNewsAndEvents = deleteNewsAndEvents;
