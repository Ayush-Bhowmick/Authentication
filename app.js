require("dotenv").connect()
require("./config/database").connect()

const express= require ("express")
const bcrypt= require ("bcrypt")
const jwt = require ("jsonwebtoken")
const cookieParser = require('cookie-parser')
//import auth from middleware
const auth=require("./middleware/auth")

//import user from model as User
const User = require("./model/user")   // <- <-        <- <-         <-<-          //USER <- <- <- <-

const app= express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.get("/",(res,req)=>{
    res.send("HELLO AUTH!!!!!")
})

//  REGISTER

app.post("/register",async (res,req)=>{
    try {

        //COLLECT ALL THE INFORMATION FROM FRONTEND-req.body
        const{firstName,lastName,email,password}=req.body

        //Validate it's presence ,if not send a MSG
        if(!(firstName && lastName && email && password)){
              res.status(401).send("All fields required")
        }

        // check the user excist or not
        const extUser = await User.findOne({email})

        //bcrypt the password
        const myEntPassword = await bcrypt.has(password,10)

        //Create new entry in database
        const user= await User.create({
            firstName,
            lastName,
            email,
            password : myEntPassword,
        })

        //create token and send it to user
        const token= await jet.sign({ id:user_id,email},'ayu',{expireIn:"2h"})
        user.token=token
        user.password=undefined
        res.status(201).jwt(user)

    } catch (error) {
        console.log(error);
        console.log("Error in RESPONSE route");
    }
})

//  LOGIN

app.post("/login",async(res,req)=>{
    try {
        //collect info from req.body
    const {email,password}=req.body
    //verify it 
    if(email && await bcrypt.has(password,myEntPassword)){
        const token= jwt.sign({id:user_id,email},process.env.secret,{expireIn:'2h'})
        user.password=undefined
        user.token=token

        const option={
            expires: new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true 
        }                   //name\/   value\/ 
        res.status(200).cookie( "token",  token, options).json(
            {
                success:true,
                token,
                user
            }
        )
    }
}catch (error) {
    console.log(error);
    console.log("ERROR IN LOGIN");
}
    }) 

//   DATABASE

app.get("/database",auth,(res,req)=>{

    res.send('Welcome to dashboard')

})

module.export=app