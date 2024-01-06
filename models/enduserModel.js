import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  printColor: {
    type: String,
    required: true,
    trim: true
  },
  paperSize: {
    type: String,
    required: true,
    trim: true
  },
  orientation: {
    type: String, // 'landscape' or 'portrait'
    required: true,
    trim: true
  },
  sides: {
    type: String, // 'single-sided' or 'double-sided'
    required: true,
    trim: true
  },
  pageNumber: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('EndUser', preferenceSchema);




