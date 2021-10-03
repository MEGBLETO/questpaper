
require('dotenv').config()
const express = require('express')
const mysql = require('mysql')




//connection a ma base de donnee


const dbconn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'questpaper',
    port     : '8889'
})

console.log(process.env.HOST)

dbconn.connect((err) =>{
    if(err){
        throw(err)
    }
    console.log('MySql connected...')
 });
  




const app = express()
const PORT =process.env.PORT || 5000


app.listen(PORT, () => console.log(`The server has started on ${PORT}...`))

