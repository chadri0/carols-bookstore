const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "A title is required"],
  },
  author: {
    type: String,
    required: [true, "The author's name is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
    min: [1, "Minimum price is 1"],
  },
  starRating: {
    type: Number,
    required: [true, "The rating is required"],
    min: [1, "Minimum number of star rating is 1"],
    max: [5, "Maximum number of start rating is 5"],
  },
  synopsis: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;