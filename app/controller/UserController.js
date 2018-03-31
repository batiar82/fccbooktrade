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
module.exports={
    save
}