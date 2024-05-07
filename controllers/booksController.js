const siteData = require('../data/siteData');
const Book = require("../models/bookModel");

//read all books
const getAllBooks = async (request, response, next) => {
    await Book.find({}).then((books) =>
    response.status(200).json({
      success: { message: "This route points to the Books page with all of the books" },
      data: books, siteData,
      statusCode: 200,
    })
    )
};

//read a book by the ID
const getBook = async (request, response, next) => {
  const { _id } = request.params;

    await Book.findOne({ _id: _id }).then((book) => {
    response.status(200).json({
      success: { message: "This route points to the Books page with one of the books by the ID" },
      data: book, siteData,
      statusCode: 200
    });  
  } 
  ) 
};

module.exports = { getAllBooks, getBook };
