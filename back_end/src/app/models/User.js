const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: { type: Number },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    birthDay: { type: String },
    deletedAt: { type: Date },
    isAdmin: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    addressCode: { type: String, default: "" },
  },
  {
    id: false,
    timestamps: true,
  }
);


User.plugin(AutoIncrement);

module.exports = mongoose.model("User", User);
