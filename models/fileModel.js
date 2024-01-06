// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // Define your file schema if needed
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
