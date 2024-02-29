const exp=require('express')
const authorApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsyncHandler=require('express-async-handler')

let authorsCollection;
let articlesCollection;
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//define routes
authorApp.post('/user',expressAsyncHandler(createUserOrAuthor) )
//author login
authorApp.post('/login',expressAsyncHandler(userOrAuthorLogin) )

//to save new article
authorApp.post('/new-article',expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    //save new Article to articles collection
    await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"New article added"})
}))

//read artcles by author's username
authorApp.get('/articles/:username',expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const usernameOfAuthor=req.params.username;
    //get articles of current author
    const articlesList=await articlesCollection.find({username:usernameOfAuthor,status:true}).toArray()
    //send res
    res.send({message:"Articles",payload:articlesList})
}))


//edit article
authorApp.put('/article',expressAsyncHandler(async(req,res)=>{

        //get modified article
        const modifiedArticle=req.body;
        await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
        res.send({message:"Article modified"})

}))

//delete article(soft delete)
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    let article=req.body;
    await articlesCollection.updateOne({articleId:article.articleId},{$set:{...article}})
    res.send({message:"Article deleted"})
}))


//export userApp
module.exports=authorApp;

