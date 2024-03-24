"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../../middlewares/multer");
const hero_1 = require("../../controller/home/hero");
const router = (0, express_1.Router)();
// Initialize Multer
const upload = (0, multer_1.default)({ storage: multer_2.storage });
router.route("/img").post(upload.single("hero-img"), hero_1.addHeroImg);
router
    .route("/img/:id")
    .get(hero_1.getHeroImg)
    .patch(upload.single("hero-img"), hero_1.updateHeroImg);
router.route("/text").post(hero_1.addHeroText);
router.route("/text/:id").get(hero_1.getHeroText).patch(hero_1.updateHeroText);
exports.default = router;
