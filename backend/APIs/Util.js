
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()



//req handler for user/auhtor registration
const createUserOrAuthor = async (req, res) => {
  //get users and authors collecion object
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollection = req.app.get("authorsCollection");

  //get user or autrhor
  const user = req.body;

  //check duplicate user
  if (user.userType === "user") {
    //find user by usersname
    let dbuser = await usersCollectionObj.findOne({ username: user.username });
    //if user existed
    if (dbuser !== null) {
     return res.send({ message: "User already existed" });
    }
  }
  //check duplicate author
  if (user.userType === "author") {
     //find user by usersname
     let dbuser = await authorsCollection.findOne({ username: user.username });
     //if user existed
     if (dbuser !== null) {
      return res.send({ message: "Author already existed" });
     }
  }

  //hash password
    const hashedPassword=await bcryptjs.hash(user.password,7)
    //replace plain pw with hashed pw
    user.password=hashedPassword;

    //save user
    if(user.userType==='user'){
        await usersCollectionObj.insertOne(user)
        res.send({message:"User created"})
    }
    //save author
      //save user
      if(user.userType==='author'){
        await authorsCollection.insertOne(user)
        res.send({message:"Author created"})
    }

};

const userOrAuthorLogin = async(req, res) => {
     //get users and authors collecion object
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollection = req.app.get("authorsCollection");

  //get user or autrhor
  const userCred = req.body;
  //verifuy username of user
  if(userCred.userType==='user'){
    let dbuser=await usersCollectionObj.findOne({username:userCred.username})
    if(dbuser===null){
        return res.send({message:"Invalid username"})
    }else{
        let status=await bcryptjs.compare(userCred.password,dbuser.password)
       // console.log("status",status)
        if(status===false){
            return res.send({message:"Invalid password"})
        }
        else{
            //create token
           const signedToken= jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
           delete dbuser.password;
           res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
  }
  //verify username of author
  if(userCred.userType==='author'){
    let dbuser=await authorsCollection.findOne({username:userCred.username})
    if(dbuser===null){
        return res.send({message:"Invalid username"})
    }else{
        let status=bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            return res.send({message:"Invalid password"})
        } else{
            //create token
           const signedToken= jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:50})
           delete dbuser.password;
           res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
  }

  //if username and password are valid


};

module.exports = {createUserOrAuthor,userOrAuthorLogin};
