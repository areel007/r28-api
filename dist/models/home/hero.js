"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroText = exports.HeroImg = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const heroImgSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: [true, "This field is required"],
    },
});
const heroTextSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: [true, "This field is required"],
    },
});
exports.HeroImg = mongoose_1.default.model("HeroImg", heroImgSchema);
exports.HeroText = mongoose_1.default.model("HeroText", heroTextSchema);
