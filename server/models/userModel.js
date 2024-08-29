const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true, minlength: 3, maxlength: 10 },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 12,
    },
    password: { type: String, required: true, minlength: 4 },
    exp: { type: Number, default: 0 },
    total_questionTaken: { type: Number, default: 0 },
    total_correctAnswers: { type: Number, default: 0 },
    total_incorrectAnswers: { type: Number, default: 0 },
    total_consumedTime: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
