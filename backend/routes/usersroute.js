var express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//destination de stockage des fichiers qui on ete uploader sur la plateforme

//s3

const { uploadFile } = require("../s3");

const dbconn = require("../config");
const e = require("express");
const { RSA_NO_PADDING } = require("constants");

//email sending config detailser
var transporter = nodemailer.createTransport({
  service: "gmail",
  port:465,
  secure: true,
  secureConnection: false,
  auth: {
    user: "questpaper2021@gmail.com",
    pass: process.env.EMAIL_PWD,
  },
  logger: true,
  tls: {
    rejectUnauthorized: true,
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
      "SELECT user_id, user_email, user_sirname, user_name, role, user_password FROM users WHERE user_email = ?;",
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
                      res.send({
                        serverRes: "success",
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
                res.send({ message: "The password is incorrect !" });
              }
            });
          } else {
            res.send({
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

// ---------------file upload-----------------------------------

var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await cb(null, "./subjects/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".pdf");
  },
});

var upload = multer({ storage: storage });

router.post("/upload", upload.single("subject"), async (req, res) => {
  const file = await req.file;
  try {
    if (file) {
      //ici je recupere le fichier que jai renvoye de mon frontend
      const { originalname, destination, size, filename, path } =
        await req.file;
      const { name, domaine, year, user_email } = req.body;

      const result = uploadFile(file);

      console.log(await result);

      await dbconn.query(
        "INSERT INTO sujets (nom_sujet, nom_originel,domaine_sujet,level_sujet, path_sujet, sujet_taille, email_ajout) VALUES (?,?,?,?,?,?,?);",
        [filename, originalname, domaine, year, path, size, user_email],
        (err, result) => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
      res.send({ message: "Le fichier a bien été uploader" });
    }
  } catch (error) {
    console.log(error);
  }
});

//verifyToken



//upload de corriger


router.post("/upload/corriger", upload.single("subject"), async (req, res) => {
  const file = await req.file;
  try {
    if (file) {
      //ici je recupere le fichier que jai renvoye de mon frontend
      const { originalname, destination, size, filename, path } =
        await req.file;
      const { name, domaine, year, user_email } = req.body;

      const result = uploadFile(file);

      console.log(filename, name, path, size, user_email);

      await dbconn.query(
        "INSERT INTO correction (sujet_id,nom_correction,path_correction,correction_taille, email_ajout) VALUES (?,?,?,?,?);",
        [domaine, filename, path, size, user_email],
        (err, result) => {
          console.log(result)
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
      res.send({ message: "Le fichier a bien été uploader" });
    }
  } catch (error) {
    console.log(error);
  }
});





//files fetching from amazon s3
router.get("/files/:domaine/:year", (req, res) => {
  var domaine = req.params.domaine;
  var year = req.params.year;
  dbconn.query(
    "SELECT nom_sujet, sujet_id FROM sujets WHERE level_sujet= COALESCE(?, level_sujet) AND domaine_sujet= COALESCE(?, domaine_sujet);",
    [year, domaine],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result.length > 0) {
        res.send(result);
      }
    }
  );
});

//si seulement domaine
router.get("/secteur/:domaine", (req, res) => {
  var domaine = req.params.domaine;
  dbconn.query(
    "SELECT nom_sujet, sujet_id FROM sujets WHERE domaine_sujet= COALESCE(?, domaine_sujet);",
    [domaine],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result.length > 0) {
        res.send(result);
      }
    }
  );
});

//si seulement annee
router.get("/annee/:year", (req, res) => {
  var year = req.params.year;
  dbconn.query(
    "SELECT nom_sujet, sujet_id FROM sujets WHERE level_sujet= COALESCE(?, level_sujet);",
    [year],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result.length > 0) {
        res.send(result);
      }
    }
  );
});

router.get("/files", (req, res) => {
  var domaine = req.params.domaine;
  var year = req.params.year;
  dbconn.query("SELECT nom_sujet, sujet_id FROM sujets;", (error, result) => {
    if (error) {
      throw error;
    } else if (result.length > 0) {
      res.send(result);
    } else res.send({ message: "No subject found" });
  });
});

// logi stripe pour les paiements=========================================

const storeItems = new Map([
  [1, { priceInCents: 2000, name: "Plan d'1 mois" }],
  [2, { priceInCents: 7000, name: "Plan de 3 mois" }],
  [3, { priceInCents: 12000, name: "Plan de 4 mois" }],
  [4, { priceInCents: 20000, name: "Plan de 5 mois" }],
]);

router.post("/payer", async (req, res) => {
  try {
    const id = await req.body.value;
    const user = await req.body.user;
    const montant_sub = storeItems.get(id).priceInCents;

    const session = await stripe.checkout.sessions.create({
     
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: storeItems.get(id).name,
            },
            unit_amount: storeItems.get(id).priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/success`,
      cancel_url: "http://localhost:3000/failed",
    });
    let transactionId = session.id
    res.json({ url: session.url});


    dbconn.query("INSERT INTO membership (user_id, montant_sub,sub_mois,id_transaction) VALUES (?,?,?,?);",[user, montant_sub, id, transactionId], (error, result) => {
      if (error) {
        throw error;
      } else {
        if (result.length > 0) {
          res.json({result: result });
        }
      }
    });
    //console.log(res)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: e.message });
  }
});


//recuperer corriger grace a lid du sujet

router.get('/correction/single/:id', (req, res) =>{
  let id  = req.params.id;

  dbconn.query(`SELECT id_correction, nom_correction FROM correction WHERE sujet_id = ${id}`, (error, result) => {
    if (error) {
      throw err;
    } else {
      if (result.length > 0) {
        console.log(result)
        res.json({result: result });
      }
      else{
        res.send({"message": "Corriger indisponible"})
      }
    }
  });
})






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



router.get("/transaction/:userid",(req, res) => {
let userId = req.params.userid;

  dbconn.query("SELECT * FROM membership WHERE user_id = ?;",[userId], (error, result) => {
    if (error) {
      throw err;
    } else {
      if (result.length > 0) {
        res.json({result: result });
      }
    }
  });
});




//demande pour etre enseignant

router.post("/demande", (req, res) =>{
   const {user_id, user_sirname, user_name} = req.body;

   dbconn.query("INSERT INTO demande (user_id, user_sirname, user_name) VALUES (?,?,?);",[user_id, user_name, user_sirname], (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result.length > 0) {
        res.json({result: result });
      }
    }
})

}

)



//recuperer toute les demandes en tant que admin

router.get("/consulter",(req, res) => {
  let userId = req.params.userid;
  
    dbconn.query("SELECT * FROM demande WHERE traiter = 'false' ;", (error, result) => {
      if (error) {
        throw err;
      } else {
        if (result.length > 0) {
          res.json({result: result });
        }
      }
    });
  });


  //mettre as admin

  router.post("/upvalidate/:userid", (req, res) =>{
    const userid = req.params.userid;
 
    dbconn.query(`UPDATE users SET role = 'enseignant' WHERE user_id = ${userid}`,(error, result) => {
     if (error) {
       throw error;
     } else {
       if (result.length > 0) {
         res.json({result: result });
         console.log(result)
       }
     }
 })
 
 }
 
 )
 


 router.get("/idsujet", (req, res) =>{

  dbconn.query(`SELECT sujet_id FROM sujets`,(error, result) => {
   if (error) {
     throw error;
   } else {
     if (result.length > 0) {
       res.json({result: result });
     }
   }
})

}

)


module.exports = router;
