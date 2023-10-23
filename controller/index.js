require('dotenv').config()

// const {MongoClient} = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();
// app.use("/home", require('./routes/home'));
app.use(bodyParser.json());
app.use(express.json());


const uri = "mongodb+srv://thinhkhainguyen:thinhea33@cluster0.thnfg4o.mongodb.net/?retryWrites=true&w=majority"


//Mongoose 
const connect = async () => {
  mongoose.connect(uri)
  .then(()=>{
   console.log("Connected to Mongo's server");
  })
  .catch(err => console.log("Error connecting")
   );
}

mongoose.connection.on("disconnected", () =>{
  console.log("Disconnected from Mongo");
})
mongoose.connection.on("connected", () =>{
  console.log("MongoDB is connected");
})


//Middleware
// app.use("/home",home)
require("../controller/routes/home")(app)

app.post("/", (req, res) =>{
    console.log(req.body);
}) 

app.listen(5000,() =>{
    connect()
    console.log('http://localhost:5000/')
});