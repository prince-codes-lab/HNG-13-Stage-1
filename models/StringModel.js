const mongoose = require("mongoose");

const StringSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  value: { type: String, required: true },
  properties: { type: Object, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("String", StringSchema);
