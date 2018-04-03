const ServerError = require('../helpers/server').ServerError;
const rp = require('request-promise');
const bookService = require('./BookService');
const User = require('../model/User');
const Book = require('../model/Book');
const Request = require('../model/Request');

let saveUser = async (user) => {
    console.log("User save " + JSON.stringify(user));
    try {
        newUser = new User(user);
        await newUser.validate();
        return newUser.save();
    } catch (validateERror) {
        throw new ServerError(validateERror.message, 400);
    }
}

/**
 * Acepto un pedido del trade, borra la fila de Request
 * @param {El id del usuario dueño que acepta el trade} userId 
 * @param {El id del libro para aceptar} bookId 
 */
let acceptTrade = async (bookId) => {
    try {
        //let bookNotTradeable = await bookService.toggleTradeable(bookId);
        let theBook=await Book.findById(bookId);
        console.log("Book "+JSON.stringify(theBook));
        //let oldOwner = await User.findById(theBook.owner);
        let request= await Request.findOne({book:bookId});
        console.log(JSON.stringify(request.requester));
        let newOwner=request.requester;
        await Request.deleteOne({book: bookId});

        //Saco el libro de la lista de pedidos del nuevo usuario (ya lo tiene)
        //const requestedEliminado = newOwner.requestedBooks.filter(bookId => bookId != bool.id);
        //newOwner.requestedBooks = requestedEliminado;
        //Saco el libro de la lista de lo que le pidieronn
        //const requiredEliminado = oldOwner.requiredBooks.filter(bookId => bookId != bool.id);
        //newOwner.requiredBooks = requiredEliminado;
        //le asigno el nuevo owner al libro
        theBook.owner = newOwner;
        console.log("JJ "+JSON.stringify(theBook));
        //await newOwner.save;
        await theBook.save();
        console.log("The book: "+JSON.stringify(theBook));
    }catch(error){
        throw error;
    }
}
//Repetido con cancel trade??
let denyTrade = async (userId, bookId) => {
    try {
        //vuelvo a hacer el libro tradeable
        let book = await bookService.toggleTradeable(bookId);
        await Request.deleteOne({book: bookId});
        
    }catch(error){
        throw error;
    }
}
/**
 * Realiza un pedido para hacer un trade de libros, crea una fila en Request 
 * @param {El id del usuario que realiza el pedido} userId 
 * @param {el id del libro para tradear} bookId 
 * Ver si conviene agregar el libro a la lista del dueño
 */
let requestTrade = async (userId,bookId)=>{
    try{
        //hago que el libro no pueda ser tradeable
        let book = await bookService.toggleTradeable(bookId);
        let request = new Request();
        request.set({book: bookId,requester:userId});
        await request.save();
        
    }catch(error){

    }
}
let cancelTrade = async (bookId) => {
    try {
        let bookTraded = await bookService.toggleTradeable(bookId);
        await Request.deleteOne({book: bookId});
        
    }catch(error){
        throw error;
    }
}
let getById = async(userId)=> {
    try{
        let user = await User.findById(userId,{password:0}).exec;
        console.log("User de la db "+user);
        return user;
    }catch(err){
        throw(err);
    }
}
module.exports = { saveUser, acceptTrade, cancelTrade, denyTrade,requestTrade, getById }