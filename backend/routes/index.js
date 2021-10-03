var express = require('express')
const router = require('express').Router()


const dbconn = require('../config')


router.get('/aduser',(req, res) =>{
    let sql = `INSERT INTO users VALUES('4','coucou','hello')`;
  
    dbconn.query(sql, (err, result) =>{
         if(err){
             throw err;
         }
 console.log("Result" + result)
   res.send('user successfully added')
 })


})




module.exports = router;