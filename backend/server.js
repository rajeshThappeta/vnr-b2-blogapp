//create express app
const exp=require('express');
const app=exp();
require('dotenv').config() 

//add body parser middleware
app.use(exp.json())

const mongoClient=require('mongodb').MongoClient;

//connect tp mongodb server
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get database object
    const blogDBobj=client.db('blogdbb2')
    //create collection objects
    const usersCollection=blogDBobj.collection('users')
    const authorsCollection=blogDBobj.collection('authors')
    const articlesCollection=blogDBobj.collection('articles')

    //share collection objs with APIs
    app.set('usersCollection',usersCollection)
    app.set('authorsCollection',authorsCollection)
    app.set('articlesCollection',articlesCollection)
    console.log("DB connection success")
})
.catch(err=>{
    console.log("Err in DB connect",err)
})

//import apis
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

//handover req to specific route based on starting of path
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)


//error handling middeware
app.use((err,req,res,next)=>{
    res.send({status:"error",message:err.message})
})

//get port number from env
const port=process.env.PORT || 4000;

//assign port number to http server
app.listen(port,()=>console.log(`http server on port ${port}`))