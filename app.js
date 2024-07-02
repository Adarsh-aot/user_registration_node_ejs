const express = require('express');
const app = express();
const session = require('express-session');
const nocache = require("nocache");
const path = require('path');
const router = require('./route/register_router');
const port = 3000;
const helmet = require('helmet');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(nocache());

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  
app.use(session({
    secret: 'keyboard cat',
    cookie: {}
  }))



app.use('/' , router)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})