const express = require("express");
const router = express.Router();

const { getAllAuthors, getAuthor } = require("../controllers/authorsController");

router.get("/authors", getAllAuthors);

router.get("/authors/:_id", getAuthor);

module.exports = router;
