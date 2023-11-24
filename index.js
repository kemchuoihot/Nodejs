require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accountRoutes = require('./controller/routes/account')
const authRoutes = require('./controller/routes/auth')

const app = express();
// app.use("/home", require('./routes/home'));
app.use(bodyParser.json());
app.use(express.json());

//Mongoose
const uri = "mongodb+srv://thinhpx33:thinhea33@pos.eofalwt.mongodb.net/?retryWrites=true&w=majority" 
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
app.use(cors())

require("./controller/routes/home")(app)
// require("./controller/routes/account")(app)
// require("./controller/routes/auth")(app)
app.use("/account",accountRoutes)
app.use("/auth",authRoutes)


//Routes


const port = process.env.PORT || 5000;
app.listen(port,() =>{
    connect()
    console.log(`http://localhost:${port}/`)
});