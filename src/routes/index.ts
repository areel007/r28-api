import { Router } from "express";
import auth from "../routes/auth";
import hero from "../routes/home/hero";
import newsAndEvents from "../routes/news.and.events";
import cors from "cors";

const router = Router();
router.use(cors());

router.use("/api/auth", auth);
router.use("/api/home/hero", hero);
router.use("/api/news-and-events", newsAndEvents);

export default router;
