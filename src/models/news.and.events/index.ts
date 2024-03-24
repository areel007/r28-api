import mongoose from "mongoose";

const newsAndEventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "This field is required"],
  },
  subtitle: {
    type: String,
    required: [true, "This field is required"],
  },
  content: {
    type: Object,
    required: [true, "News must have a detail"],
  },
  newsImgUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NewsAndEvents = mongoose.model("NewsAndEvents", newsAndEventsSchema);

export default NewsAndEvents;
