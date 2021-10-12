var express = require("express");
const bodyParser = require('body-parser')
const router = require("express").Router();
var bcrypt = require('bcryptjs');

const dbconn = require("../config");



//Cette route permet d'inscrire un nouvel utillisateur on verifie dans un premier temps si il existe dans la base grace a son email ensuite on hash son mot de passe avant de l'inserer

router.post("/inscrire", (req, res) => {
  

const {name, email, sirname, adresse, password, pwdrepeat} = req.body;


console.log(adresse)

  let sql = `SELECT email from users WHERE email = '${email}' `;

  dbconn.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length === 0) {

        //hashing of password using Bcryptjs
        var salt = bcrypt.genSaltSync(10);

        //bcrypt take as parameter the salt as well as the passeword that need to be hashed
        var hash = bcrypt.hashSync(password, salt);
          

        let sql =
          `INSERT INTO users (sirname, name, email, password, adresse) VALUES ('${sirname}', '${name}','${email}', '${hash}','${adresse}');`;
        dbconn.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            throw err;
          }
         const resultat = JSON.stringify(result)
          console.log("Result" + resultat);
          res.send("user successfully added");
        });
      } else {
        res.send("This user already exist");
      }
    }
  });
});





// router.get("/aduser", (req, res) => {
//   let sql = `INSERT INTO users VALUES('4','coucou','hello')`;

//   dbconn.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log("Result" + result);
//     res.send("user successfully added");
//   });
// });

module.exports = router;
