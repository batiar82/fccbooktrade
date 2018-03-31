const userService = require('../service/UserService');

/*
const getAll = () =>{
    //console.log("lalal")
    return userService.getAll();
}
*/
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
    return userService.acceptTrade(user,bookId);
}
const denyTrade = (bookId)=>{
    return userService.denyTrade(user,bookId);
}

const cancelTrade = (bookId)=>{
    return userService.cancelTrade(user,bookId);
}

module.exports={
    save,acceptTrade, denyTrade,cancelTrade
}