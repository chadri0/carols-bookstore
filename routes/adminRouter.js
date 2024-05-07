const express = require("express");
const passport = require("passport");
const router = express.Router();

const {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor} = require("../controllers/adminController");

const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect(403, "/unauthenticated");
    }
};

router.get("/admin", checkAuthentication, (request, response, next) => {
    router.get("/auth", (request, response, next) => {
        response.json("Authenticated");
    });
   
    router.post("/create-book", createBook);
    router.put("/books/:_id/edit", editBook);
    router.delete("/books/:_id/delete", deleteBook);

    router.post("/create-author", createAuthor);
    router.put("/authors/:_id/edit", editAuthor);
    router.delete("/authors/:_id/delete", deleteAuthor);
});

router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/");
});

//implement Google Strategy

//GET to the path of /login/google with passport authentication of the google route and providing a scope object of an array with a string of profile
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

//GET to the path of /login/google/failed with a callback that has a res.status.json where the message states that "There is a problem with Google Authentication".
router.get('/login/google/failed', (req, res, next) => {
    res.json({ message: 'There is a problem with Google authentication.' });
});

//Lastly, GET to the path of /auth/google with passport authentication of the google route and providing a successRedirect to / AND a failureRedirect to /login/local/failed
router.get('/auth/google/admin', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login/google/failed'
}));

// github strategy
//Direction: we'll need to implement three different routes here to get our GitHub Strategy.
//GET to the path of /login/github and a second parameter that allows passport to authenticate a string of github
router.get('/login/github', passport.authenticate('github'));

//GET to the path of /login/github/failed with a callback that has a res.status.json where the message states that "There is a problem with Github Authentication".
router.get('/login/github/failed', (req, res, next) => {
  res.json({ message: 'There is a problem with GitHub authentication.' });
});

//Lastly, GET to the path of /auth/github with passport authentication of the github route and providing a successRedirect to / AND a failureRedirect to /login/github/failed
router.get('/auth/github', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login/github/failed'
}));

module.exports = router;