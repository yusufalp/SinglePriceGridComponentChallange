const express = require('express');
const router = express.Router();

const books = require('../data/books');

router.get('/', (req, res, next) => {
  console.log("auth", req.isAuthenticated());
  console.log("user", req.user);
  const username = req.isAuthenticated() ? req.user?.username : "";
  res.render('index', {
    books: books,
    isUserLoggedIn: req.isAuthenticated(),
    username: username
  });
});

router.get('/books/:id', (req, res, next) => {
  const { id } = req.params;
  const foundBook = books.find(book => book._id === id);
  console.log(foundBook);
  res.render('book', {
    book: foundBook
  });
});

router.post('/search', (req, res, next) => {
  const { movieSearchTerm } = req.body;
  requestMod.get(`${searchUrl}&query=${encodeURI(movieSearchTerm)}`, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.render('results', {
      movieSearchResults: parsedData.results,
      searchedFor: movieSearchTerm
    });
  });
});

module.exports = router;