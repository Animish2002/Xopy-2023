import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  fileName: String,
  preferences: {
    numCopies: Number,
    colorOption: String,
    printSide: String
  }
});
const Preference = mongoose.model('Preference', preferenceSchema);

export default Preference;
