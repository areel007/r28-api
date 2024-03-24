"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const newsAndEventsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
    },
    subtitle: {
        type: String,
        required: [true, "This field is required"],
    },
    content: {
        type: Object,
        required: [true, "News must have a detail"],
    },
    newsImgUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const NewsAndEvents = mongoose_1.default.model("NewsAndEvents", newsAndEventsSchema);
exports.default = NewsAndEvents;
