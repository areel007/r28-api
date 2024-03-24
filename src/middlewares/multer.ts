import multer from "multer";
import path from "path";

// const location = path.join(process.cwd(), "uploads");

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Use the original filename
  },
});
