const ServerError = require('../helpers/server').ServerError;
const rp = require('request-promise');
const User = require('../model/User');
const Book = require('../model/Book');

let getAll=()=>{
    console.log("pepe");
    //return "pepe";
    return Book.find({}).exec();
}

let saveBook = async (user, book)=>{

    book.owner=user;
    console.log(JSON.stringify(book));
    try{
        newBook=new Book(book);
        //let dbUser=await User.findById(user);
        //console.log("DBUSER "+JSON.stringify(dbUser));
        newBook.owner=user;
        await newBook.validate();
        return newBook.save();
    }catch(validateError){
        throw new ServerError(validateError.message,400);
    }
}

let searchBook = async (query)=>{
    const options={url: parseURI(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&fields=items(id,volumeInfo/title,volumeInfo/imageLinks)`)}
    try{
        const response = await rp(options);

        return Promise.resolve
    }catch(error){
        Promise.reject(error);
    }
    
}
let toggleTradeable = async (bookId)=>{
    try{
        let book=await Book.findById(bookId);

        book.set({tradeable:!book.tradeable});
        return book.save();
        
    }catch(error){
        throw error;
    }
}
let deleteBook = async (bookId)=>{
    try{
        console.log("BookId: "+bookId);
        return Book.deleteOne({_id: bookId});
    }catch(error){
        throw error;
    }
}
module.exports={
    getAll,
    saveBook,
    toggleTradeable,
    deleteBook
}


