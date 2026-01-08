import express from 'express';
import jwt from 'jsonwebtoken';
const {jsonwebtoken} = jwt;

const app={
    name:"Abhiraj",
    account_number:123456789
}

const token = jwt.sign(app,"secret");
console.log(token)
const verified= jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWJoaXJhaiIsImFjY291bnRfbnVtYmVyIjoxMjM0NTY3ODksImlhdCI6MTc2NzcwNDYzNX0.vMp0zod9VjPdpz6K-jvnVxMpgh954BQus6_XdLNAW9o',
    "secret"
);
console.log(verified)