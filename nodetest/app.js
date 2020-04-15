let express = require('express')
let app = express()
let router = require('./router')
let passport = require('passport')
let localStrategy = require('passport-local').Strategy
let session = require('express-session')
let flash = require('connect-flash')
let service = require('./app.module/service/middleware')

// Terminal use "nodemon app.js"
// automatically restarting the node application when file changes in the directory are detected.
app.listen(3000, () => {
  console.log("start express server 3000");
})

// * Set middleware
app = new service(app, express)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// init
app.use(passport.initialize())
app.use(flash())

// * Set router
app.use(router)

// app.use를 이용해 middleware사용

// let nodeTest = require('./test/stream')
let nodeTest = require('./server.test/http')
// nodeTest()