import { Router } from "express";
import multer from "multer";
import { storage } from "../../middlewares/multer";

import {
  addHeroImg,
  addHeroText,
  getHeroImg,
  getHeroText,
  updateHeroImg,
  updateHeroText,
} from "../../controller/home/hero";

const router = Router();

// Initialize Multer
const upload = multer({ storage: storage });

router.route("/img").post(upload.single("hero-img"), addHeroImg);

router
  .route("/img/:id")
  .get(getHeroImg)
  .patch(upload.single("hero-img"), updateHeroImg);

router.route("/text").post(addHeroText);
router.route("/text/:id").get(getHeroText).patch(updateHeroText);

export default router;
