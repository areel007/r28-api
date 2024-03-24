import { Router } from "express";
import multer from "multer";
import {
  addNewsAndEvents,
  deleteNewsAndEvents,
  getAllNewsAndEvents,
  getNewsAndEvents,
} from "../../controller/news.and.events";
import { storage } from "../../middlewares/news.file.upload";

const router = Router();

// Initialize Multer
const upload = multer({ storage: storage });

router
  .route("/")
  .post(upload.array("news-files"), addNewsAndEvents)
  .get(getAllNewsAndEvents);

router.route("/:id").get(getNewsAndEvents).delete(deleteNewsAndEvents);

export default router;
