import mongoose from "mongoose";

const heroImgSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "This field is required"],
  },
});

const heroTextSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "This field is required"],
  },
});

export const HeroImg = mongoose.model("HeroImg", heroImgSchema);
export const HeroText = mongoose.model("HeroText", heroTextSchema);
