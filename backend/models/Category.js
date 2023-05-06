const mongoose = require("mongoose");

const cateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
    },
  ],
});

module.exports = mongoose.model("Category", cateSchema);
