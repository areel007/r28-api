import { Router } from "express";
import auth from "../routes/auth";
import hero from "../routes/home/hero";
import newsAndEvents from "../routes/news.and.events";

const router = Router();

router.use("/api/auth", auth);
router.use("/api/home/hero", hero);
router.use("/api/news-and-events", newsAndEvents);

export default router;
