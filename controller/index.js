require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb');

const app = express();


const connect = async () => {
  mongoose.connect("mongodb+srv://thinhpx33:thinhea33@cluster0.mjnw05a.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>{
   console.log("Connected to Mongo's server");
  })
  .catch(err => console.log("Error connecting")
   );
}

 

app.listen(5000,() =>{
    connect()
    console.log('Successfully')
});