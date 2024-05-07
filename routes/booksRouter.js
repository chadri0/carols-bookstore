const express = require("express");
const router = express.Router();

const { getAllBooks, getBook } = require("../controllers/booksController");

router.get("/books", getAllBooks);

router.get("/books/:_id", getBook);

module.exports = router;
