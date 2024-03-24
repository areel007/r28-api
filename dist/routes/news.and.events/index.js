"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const news_and_events_1 = require("../../controller/news.and.events");
const news_file_upload_1 = require("../../middlewares/news.file.upload");
const router = (0, express_1.Router)();
// Initialize Multer
const upload = (0, multer_1.default)({ storage: news_file_upload_1.storage });
router
    .route("/")
    .post(upload.array("news-files"), news_and_events_1.addNewsAndEvents)
    .get(news_and_events_1.getAllNewsAndEvents);
router.route("/:id").get(news_and_events_1.getNewsAndEvents).delete(news_and_events_1.deleteNewsAndEvents);
exports.default = router;
