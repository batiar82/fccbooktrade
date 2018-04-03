const ServerError = require('../helpers/server').ServerError;
const rp = require('request-promise');
const User = require('../model/User');
const Book = require('../model/Book');

let getAll = () => {
    return Book.find({}).exec();
}

let saveBook = async (user, book) => {

    book.owner = user;
    try {
        newBook = new Book(book);
        newBook.owner = user;
        await newBook.validate();
        return newBook.save();
    } catch (validateError) {
        throw new ServerError(validateError.message, 400);
    }
}

let searchBook = async (query) => {
    const options = { url: encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks)`) }
    return new Promise(function (resolve, reject) {
        rp(options).then(function (response, errors) {
            if (errors) {
                reject(errors);
            }
            items = JSON.parse(response).items;
            let booksArr = [];
            if (items != undefined)
                booksArr = items;
            const books = booksArr.map(book => {
                const info = book.volumeInfo;

                let thumb = "";
                let author = "";
                if (info.imageLinks != undefined && info.imageLinks.smallThumbnail != undefined)
                    thumb = info.imageLinks.smallThumbnail;
                if (info.authors != undefined)
                    author = info.authors[0]

                bookObj = {
                    googleId: book.id,
                    title: info.title,
                    author: author,
                    coverUrl: thumb
                }

                return bookObj;
            });
            resolve(books);

        })
    })
}
let toggleTradeable = async (bookId) => {
    try {
        let book = await Book.findById(bookId);

        book.set({ tradeable: !book.tradeable });
        return book.save();

    } catch (error) {
        throw error;
    }
}
let deleteBook = async (bookId) => {
    try {
        console.log("BookId: " + bookId);
        return Book.deleteOne({ _id: bookId });
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAll,
    saveBook,
    toggleTradeable,
    deleteBook,
    searchBook
}


