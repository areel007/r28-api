import { Request, Response, RequestHandler } from "express";
import { HeroImg, HeroText } from "../../models/home/hero";
import fs from "fs";

export const addHeroImg: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const heroImgUrl = new HeroImg({ url: req.file?.path });
  await heroImgUrl.save();
  res.status(201).json({ heroImgUrl });
  try {
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getHeroImg: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const url = await HeroImg.findById(id);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const updateHeroImg: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    // Find the hero image document by ID
    const heroImg = await HeroImg.findById(id);

    if (!heroImg) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    // Delete the existing image file
    fs.unlink(`${heroImg.url}`, (err) => {
      if (err && err.code !== "ENOENT") {
        // Ignore file not found error
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }

      // Save the updated image file
      const updatedImagePath = req.file?.path;

      if (!updatedImagePath) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Update the image location in MongoDB
      heroImg.url = updatedImagePath;
      heroImg.save();

      res.status(200).json({ message: "Hero image updated successfully" });
    });
  } catch (error) {
    console.error("Error updating hero image:", error);
    res.status(500).json({ message: "Error updating hero image" });
  }
};

export const addHeroText: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { text } = req.body;
  try {
    const newText = new HeroText({ text });
    await newText.save();

    res.status(201).json({ message: "Hero text successfully added" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getHeroText: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const heroText = await HeroText.findById(id);

    if (!heroText) {
      return res.status(404).json({ message: "resource not found." });
    }

    res.status(200).json({ heroText });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHeroText: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { updatedText } = req.body;
  try {
    const text = await HeroText.findById(id);
    if (!text) {
      return res.status(404).json({ message: "resource not found." });
    }

    text.text = updatedText;
    text.save();

    res.status(200).json({ message: "hero text successfully updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};
