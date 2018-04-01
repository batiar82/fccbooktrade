const bookService = require('../service/BookService');


String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
  };

const getAll = () =>{
    //console.log("lalal")
    return bookService.getAll();
}

const save = (book)=>{
    //console.log("User "+user);
    mockUser="5abfb36c05655135465670af".toObjectId();
    console.log("Book: "+JSON.stringify(book));
    console.log("MockUser "+JSON.stringify(mockUser));
    return bookService.saveBook(mockUser,book);
}

const search = (query)=>{
    console.log("Query "+query)
    return bookService.searchBook(query);
}
const toggleTradeable = (bookId)=>{
    return bookService.toggleTradeable(bookId);
}
const deleteBook = (bookId) =>{
    return bookService.deleteBook(bookId);
}
module.exports={
    getAll,save,search,toggleTradeable, deleteBook
}