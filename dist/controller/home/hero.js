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
exports.updateHeroText = exports.getHeroText = exports.addHeroText = exports.updateHeroImg = exports.getHeroImg = exports.addHeroImg = void 0;
const hero_1 = require("../../models/home/hero");
const fs_1 = __importDefault(require("fs"));
const addHeroImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const heroImgUrl = new hero_1.HeroImg({ url: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    yield heroImgUrl.save();
    res.status(201).json({ heroImgUrl });
    try {
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
});
exports.addHeroImg = addHeroImg;
const getHeroImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const url = yield hero_1.HeroImg.findById(id);
        res.status(200).json({ url });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
});
exports.getHeroImg = getHeroImg;
const updateHeroImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find the hero image document by ID
        const heroImg = yield hero_1.HeroImg.findById(id);
        if (!heroImg) {
            return res.status(404).json({ message: "Hero image not found" });
        }
        // Delete the existing image file
        fs_1.default.unlink(`${heroImg.url}`, (err) => {
            var _a;
            if (err && err.code !== "ENOENT") {
                // Ignore file not found error
                console.error("Error deleting file:", err);
                return res.status(500).json({ message: "Error deleting file" });
            }
            // Save the updated image file
            const updatedImagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            if (!updatedImagePath) {
                return res.status(400).json({ message: "No image uploaded" });
            }
            // Update the image location in MongoDB
            heroImg.url = updatedImagePath;
            heroImg.save();
            res.status(200).json({ message: "Hero image updated successfully" });
        });
    }
    catch (error) {
        console.error("Error updating hero image:", error);
        res.status(500).json({ message: "Error updating hero image" });
    }
});
exports.updateHeroImg = updateHeroImg;
const addHeroText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        const newText = new hero_1.HeroText({ text });
        yield newText.save();
        res.status(201).json({ message: "Hero text successfully added" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addHeroText = addHeroText;
const getHeroText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const heroText = yield hero_1.HeroText.findById(id);
        if (!heroText) {
            return res.status(404).json({ message: "resource not found." });
        }
        res.status(200).json({ heroText });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getHeroText = getHeroText;
const updateHeroText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { updatedText } = req.body;
    try {
        const text = yield hero_1.HeroText.findById(id);
        if (!text) {
            return res.status(404).json({ message: "resource not found." });
        }
        text.text = updatedText;
        text.save();
        res.status(200).json({ message: "hero text successfully updated" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateHeroText = updateHeroText;
