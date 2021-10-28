var express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');





//destination de stockage des fichiers qui on ete uploader sur la plateforme

const upload = multer({dest: './subjects/'})


const dbconn = require("../config");


//Cette route permet d'inscrire un nouvel utillisateur on verifie dans un premier temps si il existe dans la base grace a son email ensuite on hash son mot de passe avant de l'inserer

router.post("/inscrire", (req, res) => {
  const { name, email, sirname, year, password, pwdrepeat } = req.body;

  console.log(year);

  let sql = `SELECT user_email from users WHERE user_email = '${email}' `;

  dbconn.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length === 0) {
        //hashing of password using Bcryptjs
        var salt = bcrypt.genSaltSync(10);

        //bcrypt take as parameter the salt as well as the passeword that need to be hashed
        var hash = bcrypt.hashSync(password, salt);

        dbconn.query(
          "INSERT INTO users (user_sirname, user_name, user_email, user_password, user_level) VALUES (?,?,?,?,?);",
          [sirname, name, email, hash, year],
          (err, result) => {
            if (err) {
              console.log(err);
              throw err;
            }
            const resultat = JSON.stringify(result);
            console.log("Result" + resultat);
            res.send("user successfully added");
          }
        );
      } else {
        res.send("This user already exist");
      }
    }
  });
});

// //une route pour le login
router.post("/login", (req, res) => {
  const data = req.body;
  //console.log(data.email);

  const { email, password } = req.body;

  dbconn.query(
    "SELECT user_id, user_email, user_sirname, user_name,  user_password FROM users WHERE user_email = ?;",
    email,
    (error, result) => {
      if (error) {
        throw err;
      } else {
        if (result.length > 0) {
          const hash = result[0].user_password;
          const id = result[0].id;

          //ici je compare le mot de passe encrypte de ma base a celui entrer par lutillisateur
          bcrypt.compare(`${password}`, hash, function (error, response) {
            if (error) {
              throw err;
            } else if (response === true) {
              //creation d'un token valide pour 1h qui permettra de referencer notre utillisateur sur la plateforme
              var token = jwt.sign({ auth: true, data: result[0] }, "temp", {
                expiresIn: "1h",
              });
              console.log(token);
              res.status(200).send({ message: "The password is correct !" });
            } else {
              res.status(401).send({ message: "The password is incorrect !" });
            }
          });
        } else {
          res
            .status(401)
            .send({ message: "You do not have an account please create one" });
        }
      }
    }
  );
});

//user file upload route

router.post("/upload", upload.single('subject') ,(req, res) => {
  //ici je recupere le fichier que jai renvoye de mon frontend
  const {mimetype, destination, filename, path}= req.file;
  const {domaine, year } = req.body;
  //const name = req.body;
  // console.log(path);
  console.log(req.body);
   res.send('The file has been uploaded !');
});





//get all the users
router.get("/users", (req, res) => {
  sql = `SELECT * FROM users`;

  dbconn.query(sql, (error, result) => {
    if (error) {
      throw err;
    } else {
      if (result.length > 0) {
        res.send(result);
      }
    }
  });
});

module.exports = router;
