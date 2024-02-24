const exp=require('express')
const authorApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')

//define routes
authorApp.post('/user',createUserOrAuthor)
//author login
authorApp.post('/login',userOrAuthorLogin)

//export userApp
module.exports=authorApp;