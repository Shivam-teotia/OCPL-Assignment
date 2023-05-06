const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter category"],
    },
  ],
  status: {
    type: String,
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  priority: {
    type: Number,
    default: 1,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Tasks", taskSchema);
