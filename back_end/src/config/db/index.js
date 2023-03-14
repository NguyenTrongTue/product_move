const mongoose = require("mongoose");

function connectDB() {
  try {
    mongoose
      .connect(
        "mongodb+srv://trongnguyen:Tuetn2002@cluster0.7frzaxg.mongodb.net/product_move?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => console.log("DB Connected"));
  } catch (err) {
    console.log("Connect failed");
  }
}

module.exports = connectDB;
