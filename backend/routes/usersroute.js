var express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
var once = require('once')
//destination de stockage des fichiers qui on ete uploader sur la plateforme


//s3

const {uploadFile}= require('../s3')



const dbconn = require("../config");

//email sending config details
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "questpaper2021@gmail.com",
    pass: process.env.EMAIL_PWD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get("/emailverify", (req, res) => {
  let stat = "TRUE";
  const email_token = req.query.emailtoken;
  const user_email = req.query.email;

  try {
    if (user_email) {
      let query = `SELECT email_token from users WHERE user_email = '${user_email}'`;

      dbconn.query(query, (error, resultat) => {
        if (error) {
          throw error;
        } else if (resultat.length > 0) {
          console.log(resultat[0].email_token === email_token);

          let query = `UPDATE users SET user_verif = ${stat} WHERE user_email = '${user_email}'`;

          dbconn.query(query, (error, res) => {
            if (error) {
              throw error;
            } else {
              console.log("success");
              //res.send({"message": "inscription Resussie"})
            }
          });
          res.send("success");
        } else {
          res.send({ message: "Your email adresse could not be verified" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Cette route permet d'inscrire un nouvel utillisateur on verifie dans un premier temps si il existe dans la base grace a son email ensuite on hash son mot de passe avant de l'inserer

router.post("/inscrire", (req, res) => {
  try {
    const emailtoken = crypto.randomBytes(64).toString("hex");

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
            "INSERT INTO users (user_sirname, user_name, user_email, user_password, user_level, email_token) VALUES (?,?,?,?,?,?);",
            [sirname, name, email, hash, year, emailtoken],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(401).send({
                  message: "Veuillez verifier les informations renseigner",
                });
                throw err;
              }
              const resultat = JSON.stringify(result);
              console.log("Result" + resultat);
              res.send("user successfully added");
            }
          );
        } else {
          res.status(401).send("This user already exist");
        }
        //Email de verification de compte email
        var mailing = {
          from: '"Veuillez confirmer votre adresse email" <questpaper2021@gmail.com>',
          to: email,
          subject: "Questpaper -Verifier votre adresse email",
          html: `<h2>${sirname} ${name}</h2>
                   <h4>Veuillez confirmer votre adresse email pour finaliser votre inscription</h4>
                   <a href="http://${req.headers.host}/api/user/emailverify?email=${email}&token=${emailtoken}">Confirmer la creation de mon compte</a>`,
        };

        //envoie du mail

        transporter.sendMail(mailing, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(
              "Un mail de verification a ete envoyer a votre adresse mail"
            );
          }
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

// //une route pour le login
router.post("/login", async (req, res) => {
  try {
    const data = req.body;

    const { email, password } = req.body;

    await dbconn.query(
      "SELECT user_id, user_email, user_sirname, user_name,  user_password FROM users WHERE user_email = ?;",
      email,
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result.length > 0) {
            console.log(result);
            const hash = result[0].user_password;
            const id = result[0].id;

            //ici je compare le mot de passe encrypte de ma base a celui entrer par lutillisateur
            bcrypt.compare(`${password}`, hash, function (error, response) {
              if (error) {
                console.log(error);
              } else if (response === true) {
                //creation d'un token valide pour 1h qui permettra de referencer notre utillisateur sur la plateforme
                var token = jwt.sign({ auth: true, data: result[0] }, "temp", {
                  expiresIn: "1h",
                });
                console.log(token);

                dbconn.query(
                  "SELECT user_verif FROM users WHERE user_email =?;",
                  email,
                  (error, resultat) => {
                    if (error) {
                      throw error;
                    } else if (
                      resultat.length > 0 &&
                      resultat[0].user_verif === 1
                    ) {
                      res.status(200).send({
                        token: token,
                        message: "The password is correct !",
                      });
                    } else {
                      res.send({
                        message:
                          "vous n'aviez pas confirmer votre adresse email",
                      });
                    }
                  }
                );
              } else {
                res
                  .status(401)
                  .send({ message: "The password is incorrect !" });
              }
            });
          } else {
            res.status(401).send({
              message: "You do not have an account please create one",
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

// Verification du token que nous obtenons apres que l'utillisateur se soit inscrit sur la plateforme

//Format de mon token
//Authorization: Bearer <<accesss_token>>

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  //check if bearer is not defined

  if (typeof bearerHeader !== "undefined") {
    //console.log(bearerHeader);
    //split at tthe space
    const bearer = bearerHeader.split(" ");

    //Get token from array
    const bearerToken = bearer[1];

    //set the token

    req.token = bearerToken;
    //next middleware
    next();
  } else {
    res.sendStatus(403);
  }
};


// --------------------------------------------------


var storage = multer.diskStorage({
  destination: async(req, file, cb)=> {
    await cb(null, './subjects/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.pdf') //Appending .jpg
  }
})

var upload = multer({ storage: storage });


router.post("/upload", upload.single('subject'),async(req, res) => {
  console.log(req.file)
 try {
    //ici je recupere le fichier que jai renvoye de mon frontend
  const { mimetype,originalname, destination, size, filename, path } = await req.file;
  const { name, domaine, year } = await req.body;
  //res.send({ filename, path }, { message: "The file has been uploaded !" });
const file = req.file;

const result = await uploadFile(file)

console.log(result)

  await dbconn.query(
    "INSERT INTO sujets (nom_sujet, nom_originel, path_sujet, sujet_taille, email_ajout) VALUES (?,?,?,?,?);",
    [filename, originalname, path, size,filename],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
 } catch (error) {
   console.log(error)
 }

});






//verifyToken

router.get("/files", (req, res) => {
  dbconn.query("SELECT path_sujet, sujet_id FROM sujets", (error, result) => {
    if (error) {
      throw error;
    } else if (result.length > 0) {
      console.log(result.path_sujet);
      // const readstream = fs.createReadStream(path.join(__dirname, './subjects'))
      //  readstream.pipe(res)
    }
  });
});



//user file download route
router.get("/download", (req, res) => {
  const file = fs.readFileSync("subjects/rib.pdf");
  res.contentType("application/pdf");
  res.send(file);
});

//get all the users
router.get("/users", verifyToken, (req, res) => {
  jwt.verify(req.token, "temp", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      sql = `SELECT * FROM users`;

      dbconn.query(sql, (error, result) => {
        if (error) {
          throw err;
        } else {
          if (result.length > 0) {
            res.json({ authData: authData, result: result });
          }
        }
      });
    }
  });
});

module.exports = router;
