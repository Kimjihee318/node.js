let express = require('express')
let app = express()
let router = require('./router')
let service = require('./app.module/service/middleware')

// Terminal use "nodemon app.js"
// automatically restarting the node application when file changes in the directory are detected.
app.listen(3000, () => {
  console.log("start express server 3000");
})

// * Set middleware
app = new service(app, express)

// * Set router
app.use(router)
