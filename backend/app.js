const bodyParser = require('body-parser')
require('dotenv').config()
const express = require('express')

const cors = require('cors')




//importing my routes
const route = require('./routes/index')


 const app = express()

 // parse application/json
app.use(bodyParser.json())

app.use(express.json())

 app.use(cors());






//ici je pointe vers le fichier ou mes routes sont definies
 app.use('/api', route)



const PORT =process.env.PORT || 5000


app.listen(PORT, () => console.log(`The server has started on ${PORT}...`))

