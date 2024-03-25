"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../routes/auth"));
const hero_1 = __importDefault(require("../routes/home/hero"));
const news_and_events_1 = __importDefault(require("../routes/news.and.events"));
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
router.use("/api/auth", auth_1.default);
router.use("/api/home/hero", hero_1.default);
router.use("/api/news-and-events", news_and_events_1.default);
exports.default = router;
