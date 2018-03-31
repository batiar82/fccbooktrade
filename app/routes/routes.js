const express = require('express');

const router = express.Router();
const book = require('../controller/BookController');
const user = require('../controller/UserController');
const auth = require('../controller/AuthController');

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    console.log("Hubo error: " + JSON.stringify(error));
    return res.status(500) && next(error);
  }
};
const cHandler = controllerHandler;

/**
 * Books
 */
router.get('/books', cHandler(book.getAll));

router.post('/books', cHandler(book.save, req => [req.body.book]));

router.get('/books/search', cHandler(book.search, req => [req.params]));
router.patch('/books/:id', cHandler(book.toggleTradeable, req => [req.params.id]));
router.delete('/books/:id', cHandler(book.deleteBook, req => [req.params.id]));

/**
 * User
 */
router.post('/users', cHandler(user.save, req => [req.body.user]));
/**
 * Auth
 */
router.post('/signup', cHandler(auth.signUp, (req, res, next) => [req, res, next]));
router.post('/login', cHandler(auth.login, (req, res, next) => [req, res, next]));

module.exports = router;