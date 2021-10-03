const mysql = require('mysql')





//connection a ma base de donnee


const dbconn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'questpaper',
    port     : '8889'
})


dbconn.connect((err) =>{
    if(err){
        throw(err)
    }
    console.log('MySql connected...')
 });
  



module.exports = dbconn;