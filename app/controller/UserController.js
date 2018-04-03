const userService = require('../service/UserService');
const { requireAuthentication } = require('../service/Auth');
const mockUser1="5abfb36c05655135465670af".toObjectId();
const mockUser2="5abfff89e95ae9588f1f75b8".toObjectId();

const save = (user)=>{
    console.log("User "+user);
    console.log("User: "+JSON.stringify(user));
    return userService.saveUser(user);
}
/*
const search = (title)=>{
    console.log("Query "+title)
    return userService.searchUser(title);
}*/
const acceptTrade = (bookId)=>{
    console.log("Book encontr "+bookId);
    return userService.acceptTrade(bookId);
}
const denyTrade = (bookId)=>{
    return userService.denyTrade(user,bookId);
}

const cancelTrade = (bookId)=>{
    return userService.cancelTrade(bookId);
}

const requestTrade = (bookId)=>{
    return userService.requestTrade(mockUser2,bookId);
}
const getMe = (user,userId)=>{
    console.log("user "+JSON.stringify(user));
    requireAuthentication(user);
    return userService.getById(userId);
}
module.exports={
    getMe,save,acceptTrade, denyTrade,cancelTrade,requestTrade
}