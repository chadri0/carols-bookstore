const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

const createBook = async (request, response, next) => {
    const { title, author, price, starRating, synopsis } = request.body;

    const newBook = new Book({
        title: title,
        author: author,
        price: price,
        starRating: starRating,
        synopsis: synopsis,
      });
    
    try {
        await newBook.save();
        response
        .status(201)
        .json({ success: "A new book is created", data: newBook, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while creating a book", data: newBook, statusCode: 400 });
    }
}

const editBook = async (request, response, next) => {
    const { _id } = request.params;

    const { title, author, price, starRating, synopsis } = request.body;

    const updatedBook = {
        title: title,
        author: author,
        price: price,
        startRating: starRating,
        synopsis: synopsis,
    }; 

    
    await Book.findByIdAndUpdate({ _id: _id }, updatedBook);

    try {
        response.status(200).json({
            success: `The book with id ${_id} is updated successfully`,
            data: updatedBook,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while editing a book", statusCode: 400 });
    }
}

const deleteBook = async (request, response, next) => {
    const { _id } = request.params;

    await Book.findByIdAndDelete({ _id: _id });

    try {
        response.status(200).json({
            success: `The book with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while deleting a book", statusCode: 400 });
    }
}

const createAuthor = async (request, response, next) => {
    const { firstName, lastName, birthYear, bio } = request.body;

    const newAuthor = new Author({
        firstName: firstName, 
        lastName: lastName, 
        birthYear: birthYear, 
        bio: bio 
      });

    try {
        await newAuthor.save(); 
        response
        .status(201)
        .json({ success: "A new author is created", data: newAuthor, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while creating an author", data: newAuthor, statusCode: 400 });
    }
}


const editAuthor = async (request, response, next) => {
    const { _id } = request.params;

    const { firstName, lastName, birthYear, bio } = request.body;

    const updatedAuthor = {
        firstName: firstName, 
        lastName: lastName, 
        birthYear: birthYear, 
        bio: bio 
    };

    await Author.findByIdAndUpdate({ _id: _id }, updatedAuthor);

    try {
        response.status(200).json({
            success: `The author with id ${_id} is updated successfully`,
            data: updatedAuthor,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while editing an author", statusCode: 400 });
    }
}


const deleteAuthor = async (request, response, next) => {
    const { _id } = request.params;
    await Author.findByIdAndDelete({ _id: _id });

    try {
        response.status(200).json({
            success: `The author with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while deleting an author", statusCode: 400 });
    }
}

module.exports = {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor};