const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
    },
  ],
});

//to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// to compare login time password with original password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//to generate token
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
