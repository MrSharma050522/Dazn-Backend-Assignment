import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

export default mongoose.model<IMovie>("Movie", MovieSchema);