import express from 'express';
import jwt, { decode } from 'jsonwebtoken';

import path from "path";
import { fileURLToPath } from "url";

const JWT_SECRET="abhiraj@hero1"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app =express();

app.use(express.json());
const users=[];

app.use(express.static(path.join(__dirname, "public")));

app.get("/",function(req,res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"You are signed in."
    })
})

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    let user=null;

    user=users.find(function(u){
        if(u.username==username && u.password ==password){
            return true;
        }else{
            return false;
        }
    })
    if(user){
        const token= jwt.sign({
            username:username
        },JWT_SECRET);
        res.json({
            token:token
        })
        console.log(users);
        
    }else{
        res.json({
            message: "Credentials incorrect."
        })
        return
    }
    
})

//middleware
function auth(req,res,next){
    const token = req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET);
    if(req.username==username){
        next()
    }else{
        req.json({
            message:"You are not logged in."
        })
    }
    
}

app.get('/me',auth,function(req,res){
    // const token = req.headers.token;
    // const decodedData=jwt.verify(token,JWT_SECRET);

    if(decodedData.username){
        let foundUser=null;
        for(let i=0;i<users.length;i++){
            if(users[i].username===req.username){
                foundUser=users[i];
            }
        }
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }
})

app.listen(3000);