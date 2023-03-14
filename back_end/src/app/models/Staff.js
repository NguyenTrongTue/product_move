const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Staff = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, maxLength: 50 },
    addressCode: { type: String, required: true },
    password: { type: String, required: true },
    isManager: { type: Boolean, required: true },
    address: { type: String },
    phone: { type: String },
    birthDay: { type: String },
    deletedAt: { type: Date },
    gender: { type: String },
  },
  {
    id: false,
    timestamps: true,
  }
);



module.exports = mongoose.model("Staff", Staff);
