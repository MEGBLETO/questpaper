const bodyParser = require('body-parser')
require('dotenv').config()
const express = require('express')









//fileupload package
const cors = require('cors')




//importing my routes
const usersroute = require('./routes/usersroute')
const adminsroute = require('./routes/adminsroute')
const teachersroute = require('./routes/teachersroute')
const cookieParser = require('cookie-parser')


 const app = express()

 // parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.json())

 app.use(cors());







//ici je pointe vers le fichier ou mes routes sont definies

//users route
 app.use('/api/user', usersroute)


//  //admins route
// app.use('/api/admin', adminsroute)



//  //teachers route

//  app.use('/api/admin', teachersroute)



const PORT =process.env.PORT || 5000


app.listen(PORT, () => console.log(`The server has started on ${PORT}...`))

