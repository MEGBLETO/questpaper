
require('dotenv').config()
const express = require('express')



//importing my routes
const route = require('./routes/index')


 const app = express()






//ici je pointe vers le fichier ou mes routes sont definies
 app.use('/api', route)



const PORT =process.env.PORT || 5000


app.listen(PORT, () => console.log(`The server has started on ${PORT}...`))

