//DEPENDENCY IMPORTS
const express  = require('express')
const {MongoClient} = require('mongodb')
const serverApp = express();
const connectionString = 'mongodb+srv://revanth:revanth199419941994@cluster0.ahsix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const bodyParser = require("body-parser");
require('./dotenv')

//MIDDLE WARE CONFIGS
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.set('view enginer', 'ejs')
serverApp.use(express.static('public'))



//MONGO CONNECT
MongoClient.connect(connectionString, (err,client) => {
  //ERROR HANDLING
  if (err) {
    return console.error(err);
  }
  //RETRIEVE THE DB
  const usersDB = client.db("users-data");
  const usersCollection = usersDB.collection("users");

  //\\-----ROUTES------//\\

  //READ OPERATION
  serverApp.get('/', (req,res) => {
      usersDB.collection('users').find().toArray()
      .then(users => {
            res.render('index.ejs',{users:users})
      })
      .catch(error => {console.error(error)})
  })

  //CREATE user information
  serverApp.post("/createUser", (req, res) => {
    //apply promise on this
    usersCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => console.error(error));
  });

  //UPDATE 
  


})
serverApp.listen(5000);