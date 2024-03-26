import { Request, RequestHandler, Response } from "express";
import NewsAndEvents from "../../models/news.and.events";
import fs from "fs";
import path from "path";

interface UploadedFile {
  path: string;
}

export const addNewsAndEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let path = "";
  try {
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path = path + singleFile.path + ",";
          });
        } else {
          path = path + file.path + ",";
        }
      });
      path = path.substring(0, path.lastIndexOf(","));
    }

    const { title, subtitle, content } = req.body;
    const newsImgUrl = path;

    const news = new NewsAndEvents({
      title,
      subtitle,
      content,
      newsImgUrl,
    });

    await news.save();
    res.status(201).json({ message: "News and events successfully added" });
  } catch (error) {
    console.error("Error adding news and events:", error);
    res.status(500).json({ message: "Error adding news and events" });
  }
};

export const getAllNewsAndEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const newsAndEvents = await NewsAndEvents.find();

    res.status(200).json({ newsAndEvents });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getNewsAndEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const newsAndEvents = await NewsAndEvents.findById(id);

    if (!newsAndEvents) {
      return res.status(404).json({ message: "resource not found" });
    }

    res.status(200).json({ newsAndEvents });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNewsAndEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const newsAndEvents = await NewsAndEvents.findById(id);

    if (!newsAndEvents) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (!newsAndEvents.newsImgUrl) {
      return res
        .status(400)
        .json({ message: "No images associated with this entry" });
    }

    // Extract image URLs
    const imageUrls = newsAndEvents.newsImgUrl.split(",");

    // Delete each image associated with the post
    imageUrls.forEach(async (imageUrl: string) => {
      try {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          imageUrl.trim()
        );
        if (fs.existsSync(imagePath)) {
          await fs.promises.unlink(imagePath);
        }
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Delete the news and events entry
    await NewsAndEvents.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "News and events successfully deleted along with associated images",
    });
  } catch (error) {
    console.error("Error deleting news and events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
