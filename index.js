const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
require('dotenv').config()
const posts = [
  {
    name: "CBIT",
    title: "Welcome to CBIT"
  },
  {
    name: "MGIT",
    title: "Welcome to MGIT"
  }
]

const authenticateToken=(req, res, next)=> {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) 
    {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}
app.post('/login', (req, res) => {
    const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
  
  res.json({ accessTokenis: accessToken})
})
app.use(authenticateToken)
  app.get('/posts',(req, res) => {
  console.log(req.user.name)
  res.json(posts.filter(post => post.name === req.user.name))
  
})
app.listen(3000)




// const express = require("express");
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");
// dotenv.config();
// const app = express();
// const key = process.env.KEY;
// console.log(key);
// app.use(express.json());
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     if (username == "admin" && password == "1234") {
//         console.log("Login Successfull..!!!");
//     } else {
//         console.log("Login Failed :(");
//     }
//     res.send("Login");
// });

// // const verifyToken=(Key,JWT){

// // }
// app.get("/protected", async (req, res) => {
//     res.send("This is protected route");
// });
// app.listen(3000);
