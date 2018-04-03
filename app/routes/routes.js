const express = require('express');

const router = express.Router();
const book = require('../controller/BookController');
const user = require('../controller/UserController');
const auth = require('../controller/AuthController');
const passport = require('passport');

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

router.post('/books', cHandler(book.save, req => [req.user,req.body.book]));

router.get('/books/search/:query', cHandler(book.search, req => [req.params.query]));
router.patch('/books/:id', cHandler(book.toggleTradeable, req => [req.params.id]));
router.delete('/books/:id', cHandler(book.deleteBook, req => [req.params.id]));

/**
 * User
 */
router.post('/users', cHandler(user.save, req => [req.body.user]));
router.post('/users/acceptTrade/:id', cHandler(user.acceptTrade, req => [req.params.id]));
router.post('/users/denyTrade/:id', cHandler(user.denyTrade, req => [req.params.id]));
router.post('/users/cancelTrade/:id', cHandler(user.cancelTrade, req => [req.params.id]));
router.post('/users/requestTrade/:id', cHandler(user.requestTrade, req => [req.params.id]));
router.get('/users/:id',cHandler(user.getMe, req=>[req.user,req.params.id]));
/**
 * Auth
 */
router.post('/login', 
  passport.authenticate('local-signin',  {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));

  router.get('/home', isAuthenticated, function(req, res){
    res.json('home', { user: req.user });
  });
  
  function isAuthenticated(req, res, next) {
    console.log("Autenticado ? "+req.isAuthenticated());
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }


router.post('/signup', cHandler(auth.signup, (req, res, next) => [req, res, next]));

router.post('/signup', cHandler(auth.signup, (req, res, next) => [req, res, next]));

router.post('/signin', cHandler(auth.signin, (req, res, next) => [req, res, next]));

module.exports = router; 