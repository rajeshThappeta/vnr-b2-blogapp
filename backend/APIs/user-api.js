//create mini-express app
const exp=require('express')
const userApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsynHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')
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
userApp.get('/articles',verifyToken,expressAsynHandler(async(req,res)=>{
    //get all articles of all authors
    const articlesList=await articlesCollection.find({status:true}).toArray()
    res.send({message:"All articles",payload:articlesList})

}))


//write comment for an article by its artioclesID
userApp.post('/comment/:articleId',expressAsynHandler(async(req,res)=>{

        //get articleId from url
       const articleIdFromURL=req.params.articleId;
        //get comment obj from req
        const userComment=req.body;
        //add usercomment obj as an element to comments array of article document
        await articlesCollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:userComment}})
        //send res
        res.send({message:"User comment added"})

}))

//export userApp
module.exports=userApp;


