require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountRoutes = require('./controller/routes/account');
const authRoutes = require('./controller/routes/auth');
const homeRoutes = require('./controller/routes/home');
const androidRoutes = require('./controller/routes/android');
const customerRoutes = require('./controller/routes/customer');
const verifyRoutes = require('./controller/routes/verify')
const productsRoutes = require('./controller/routes/product')
const changePass = require('./controller/routes/changePass');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // hoặc '*' nếu bạn muốn cho phép tất cả các origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); // Sử dụng express.json thay vì body-parser

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

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/verify",verifyRoutes);
app.use("/home",homeRoutes);
app.use("/android",androidRoutes);
app.use("/customer", customerRoutes);

app.use("/product",productsRoutes);
app.use("/changePass",changePass);

app.use(cors());

if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  app.use(express.static('client/build'));
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`http://localhost:${port}`);
});
