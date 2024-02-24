//create mini-express app
const exp=require('express')
const userApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')

//define routes
//user creation
userApp.post('/user',createUserOrAuthor)

//user login
userApp.post('/login',userOrAuthorLogin)

//export userApp
module.exports=userApp;