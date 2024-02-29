//create mini-express app
const exp=require('express')
const userApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsynHandler=require('express-async-handler')
let usersCollection;
let articlesCollection;
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//define routes
//user creation
userApp.post('/user',expressAsynHandler(createUserOrAuthor))

//user login
userApp.post('/login',expressAsynHandler(userOrAuthorLogin))


// read articles of all authors
userApp.get('/articles',expressAsynHandler(async(req,res)=>{
    //get all articles of all authors
    const articlesList=await articlesCollection.find({status:true}).toArray()
    res.send({message:"All articles",payload:articlesList})

}))

//export userApp
module.exports=userApp;